import { requireUserId } from '@/apps/unitok-web/lib/auth';
import {
  createReview,
  getReviews,
} from '@/apps/unitok-web/services/review.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return Response.json({ error: 'courseId is required' }, { status: 400 });
  }

  const data = await getReviews(courseId);
  return Response.json(data);
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  const body = await req.json();

  const result = await createReview(userId, body);
  return Response.json(result);
}
