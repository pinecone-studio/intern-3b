'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { ExamInfo, UserVote } from './type';
import { AddExamForm } from '../add-exam-form/AddExamForm';
import { AppHeader } from '../../components/AppHeader';
import { FileText } from 'lucide-react';
import { ExamInfoList } from './_components/ExamInfoList';
import { AppButton } from '../../components/AppButton';
import { getCourseById } from '../../lib/mock-data';

export type { ExamInfo };

export const mockExamInfos: ExamInfo[] = [
  {
    id: 1,
    semester: '2025-1 хичээл',
    type: 'Дунд',
    likes: 12,
    dislikes: 2,
    content: 'Лекцээс гарсан 60%, даалгавраас 40%. Нээлттэй номтой шалгалт.',
    revealed: false,
    examFormats: ['Объектив', 'Эссэ'],
    strategy:
      'Лекцийн материалыг сайн давтаж, лабораторийн ажлуудыг нягт хараарай.',
    difficulty: 'Дунд',
    questionExamples: [
      'ООП-ийн үндсэн ойлголтууд',
      'Өгөгдлийн бүтцийн тодорхойлолт',
    ],
    tips: 'Практик жишээнүүдийг бодож үзээрэй',
  },
  {
    id: 2,
    semester: '2024-2 хичээл',
    type: 'Улирал',
    likes: 18,
    dislikes: 1,
    content: 'Объект-төлөвийн програмчлал, өгөгдлийн бүтэц ихэвчлэн гарсан.',
    revealed: false,
    examFormats: ['Кодчлол'],
    difficulty: 'Хэцүү',
  },
];

export default function Exam() {
  const router = useRouter();
  const params = useParams();
  console.log('params:', params);

  const courseId = Number(params.id);

  if (Number.isNaN(courseId)) {
    notFound();
  }
  const course = getCourseById(courseId);

  const [examInfos, setExamInfos] = useState<ExamInfo[]>(mockExamInfos);
  const [showAddExam, setShowAddExam] = useState(false);
  const [userVotes, setUserVotes] = useState<Record<number, UserVote>>({});

  if (!course) {
    notFound();
  }

  const handleRevealExam = (examId: number) => {
    setExamInfos((prev) =>
      prev.map((exam) =>
        exam.id === examId ? { ...exam, revealed: true } : exam,
      ),
    );
    toast({
      title: 'Мэдээлэл нээгдлээ',
      description: '1 тасалбар ашиглагдлаа',
    });
  };

  const handleVote = (examId: number, voteType: 'like' | 'dislike') => {
    const currentVote = userVotes[examId];

    if (currentVote === voteType) {
      // Remove vote
      setUserVotes((prev) => {
        const newVotes = { ...prev };
        delete newVotes[examId];
        return newVotes;
      });
      setExamInfos((prev) =>
        prev.map((exam) =>
          exam.id === examId
            ? {
                ...exam,
                likes: voteType === 'like' ? exam.likes - 1 : exam.likes,
                dislikes:
                  voteType === 'dislike' ? exam.dislikes - 1 : exam.dislikes,
              }
            : exam,
        ),
      );
    } else {
      // Add or change vote
      setUserVotes((prev) => ({ ...prev, [examId]: voteType }));
      setExamInfos((prev) =>
        prev.map((exam) =>
          exam.id === examId
            ? {
                ...exam,
                likes:
                  voteType === 'like'
                    ? exam.likes + 1
                    : currentVote === 'like'
                      ? exam.likes - 1
                      : exam.likes,
                dislikes:
                  voteType === 'dislike'
                    ? exam.dislikes + 1
                    : currentVote === 'dislike'
                      ? exam.dislikes - 1
                      : exam.dislikes,
              }
            : exam,
        ),
      );
    }
  };

  if (showAddExam) {
    return (
      <AddExamForm
        onBack={() => setShowAddExam(false)}
        onSubmit={() => setShowAddExam(false)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader
        title="Шалгалтын мэдээлэл"
        onBack={() => router.push(`/courses/${courseId}`)}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {examInfos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Шалгалтын мэдээлэл байхгүй
            </h3>
            <p className="text-xs text-muted-foreground">
              Анхны мэдээллийг нэмж бусдад туслаарай
            </p>
          </div>
        ) : (
          <ExamInfoList
            examInfos={examInfos}
            userVotes={userVotes}
            onRevealExam={handleRevealExam}
            onVote={handleVote}
          />
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border max-w-md mx-auto">
        <AppButton
          variant="primary"
          className="w-full"
          onClick={() => setShowAddExam(true)}
        >
          Шалгалтын мэдээлэл нэмэх
        </AppButton>
      </div>
    </div>
  );
}
function toast(arg0: { title: string; description: string }) {
  throw new Error('Function not implemented.');
}
