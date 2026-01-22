import { getExamInfoPreviews } from "@/apps/unitok-web/services/exam-info.service";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  if (!courseId) {
    return Response.json(
      { error: "courseId is required" },
      { status: 400 }
    );
  }

  const data = await getExamInfoPreviews(courseId);
  return Response.json(data);
}
