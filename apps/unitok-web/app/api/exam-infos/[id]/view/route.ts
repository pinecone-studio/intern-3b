import { requireUserId } from "@/apps/unitok-web/lib/auth";
import { viewExamInfo } from "@/apps/unitok-web/services/exam-info.service";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const userId = requireUserId();

  const data = await viewExamInfo(await userId, params.id);
  return Response.json(data);
}
