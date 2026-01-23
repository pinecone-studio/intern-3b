import { requireUserId } from "@/apps/unitok-web/lib/auth";
import { getTicketHistory } from "@/apps/unitok-web/services/ticket.service";


export async function GET() {
  const userId = requireUserId();

  const data = await getTicketHistory(await userId);
  return Response.json(data);
}
