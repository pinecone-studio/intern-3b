import { getFeed } from '@/apps/unitok-web/services/feed.service';

export async function GET() {
  const data = await getFeed();
  return Response.json(data);
}
