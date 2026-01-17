'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

interface UserState {
  username: string;
  xp: number;
  level: number;
  streak: number;
  hearts: number;
  gems: number;
  completedLessons: string[];
  dailyGoal: number;
  dailyProgress: number;
  selectedMajorId: string;
  lastActiveDate: string;
}

interface UserContextType extends UserState {
  updateXP: (xpToAdd: number) => void;
  updateHearts: (heartsChange: number) => void;
  updateGems: (gemsToAdd: number) => void;
  completeLesson: (lessonId: string, xpEarned: number) => void;
  updateDailyProgress: (progress: number) => void;
  updateDailyGoal: (goal: number) => void;
  updateStreak: () => void;
  changeMajor: (majorId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'mongodingo_user_data';

const defaultState: UserState = {
  username: 'subee',
  xp: 1240,
  level: 7,
  streak: 7,
  hearts: 5,
  gems: 450,
  completedLessons: [],
  dailyGoal: 100,
  dailyProgress: 50,
  selectedMajorId: 'web-development',
  lastActiveDate: new Date().toISOString().split('T')[0],
};

const calculateLevel = (xp: number): number => {
  let level = 1;
  let totalXP = 0;
  while (true) {
    const xpForNextLevel = Math.floor(500 * Math.pow(1.3, level - 1));
    if (totalXP + xpForNextLevel > xp) break;
    totalXP += xpForNextLevel;
    level++;
  }
  return level;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (e) {
        console.error('[v0] Failed to parse saved user data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const updateXP = (xpToAdd: number) => {
    setState((prev) => {
      const newXP = prev.xp + xpToAdd;
      const newLevel = calculateLevel(newXP);
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const updateHearts = (heartsChange: number) => {
    setState((prev) => ({
      ...prev,
      hearts: Math.max(0, Math.min(5, prev.hearts + heartsChange)),
    }));
  };

  const updateGems = (gemsToAdd: number) => {
    setState((prev) => ({
      ...prev,
      gems: prev.gems + gemsToAdd,
    }));
  };

  const completeLesson = (lessonId: string, xpEarned: number) => {
    setState((prev) => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      const newXP = prev.xp + xpEarned;
      const newLevel = calculateLevel(newXP);
      const newDailyProgress = Math.min(
        prev.dailyGoal,
        prev.dailyProgress + xpEarned,
      );

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedLessons: [...prev.completedLessons, lessonId],
        dailyProgress: newDailyProgress,
      };
    });
  };

  const updateDailyProgress = (progress: number) => {
    setState((prev) => ({ ...prev, dailyProgress: progress }));
  };

  const updateDailyGoal = (goal: number) => {
    setState((prev) => ({ ...prev, dailyGoal: goal }));
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    setState((prev) => {
      if (prev.lastActiveDate === today) {
        return prev;
      }

      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split('T')[0];
      const newStreak = prev.lastActiveDate === yesterday ? prev.streak + 1 : 1;

      return {
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
        dailyProgress: 0,
      };
    });
  };

  const changeMajor = (majorId: string) => {
    setState((prev) => ({ ...prev, selectedMajorId: majorId }));
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return state.completedLessons.includes(lessonId);
  };

  const value: UserContextType = {
    ...state,
    updateXP,
    updateHearts,
    updateGems,
    completeLesson,
    updateDailyProgress,
    updateDailyGoal,
    updateStreak,
    changeMajor,
    isLessonCompleted,
  };

  if (!isLoaded) {
    return null;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
