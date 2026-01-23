import { getCourseDetail } from '@/apps/unitok-web/services/course.service';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const data = await getCourseDetail(params.id);
  return Response.json(data);
}
