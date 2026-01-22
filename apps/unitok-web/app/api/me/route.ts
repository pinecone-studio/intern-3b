import { requireUserId } from "@/apps/unitok-web/lib/auth";
import { getMe } from "@/apps/unitok-web/services/user.service";


export async function GET() {
  const userId = requireUserId();

  const data = await getMe(await userId);
  return Response.json(data);
}
