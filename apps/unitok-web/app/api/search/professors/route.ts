import { searchProfessors } from '@/apps/unitok-web/services/search.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';

  if (!q) return Response.json([]);

  const data = await searchProfessors(q);
  return Response.json(data);
}
