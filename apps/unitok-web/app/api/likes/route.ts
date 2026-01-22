import { requireUserId } from "@/apps/unitok-web/lib/auth";
import { likeContent } from "@/apps/unitok-web/services/like.service";

export async function POST(req: Request) {
  const userId = requireUserId();
  const body = await req.json();

  const result = await likeContent(await userId, body);
  return Response.json(result);
}
