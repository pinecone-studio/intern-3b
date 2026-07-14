import { getTopRatedCourses } from '@/services/course.service';

export async function GET(_req: Request) {
  const data = await getTopRatedCourses();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
