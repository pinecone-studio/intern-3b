import { getMajors } from './data';
import { Major } from './types';

export async function getMajorById(id: string): Promise<Major | undefined> {
  try {
    const res = await fetch(`http://localhost:3000/api/majors/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return undefined;
    }

    const data = await res.json();
    return data.major;
  } catch (error) {
    console.error('Error fetching major:', error);
    return undefined;
  }
}

export async function getAllMajors(): Promise<Major[]> {
  return await getMajors();
}


