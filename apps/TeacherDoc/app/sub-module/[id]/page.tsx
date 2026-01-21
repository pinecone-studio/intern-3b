import { prisma } from '@/lib/prisma';
import AddButton from '@/app/_components/AddLessonBtn';
import { LessonCard } from '@/app/_components/lessonCard';

export default async function SubModulePage({
  params,
}: {
  params: { id: string };
}) {
  const subModuleId = params.id;

  // 1) SubModule -> Module -> Lesson холбоог DB-ээс олно
  const subModule = await prisma.subModule.findUnique({
    where: { id: subModuleId },
    include: { module: true },
  });

  if (!subModule) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-bold">SubModule олдсонгүй</h2>
      </div>
    );
  }

  const moduleId = subModule.moduleId;
  const module = subModule.module; // include хийсэн болохоор бэлэн
  const lessonId = module?.lessonId ?? null;

  // 2) Lesson тайлбар (одоогоор static текст байсан тул хэвээр үлдээнэ)
  //    Хэрвээ чи DB дээр description хадгалдаг бол эндээс авна.

  // 3) Энэ lesson дээр ажилладаг багш нарыг авна (role='TEACHER' + lessonId match)
  //    Role чинь String байгаа болохоор 'TEACHER' гэж тааруулж байна.
  //    Хэрвээ role өөр утгатай бол тохируул.
  const teachers = lessonId
    ? await prisma.user.findMany({
        where: { role: 'TEACHER', lessonId },
        orderBy: { name: 'asc' },
      })
    : [];

  // 4) Одоогоор auth байхгүй тул: Add материал хийх багшийг түр эхний багшаар авъя.
  //    (Дараа нь login хийдэг бол teacherId-г session-оос авна.)
  const teacherId = teachers[0]?.id ?? '';

  return (
    <div className="flex flex-col gap-10 min-h-screen bg-blue-50 justify-start">
      {/* lesson description */}
      <div className=" mt-10 mx-20">
        <div className="bg-white py-5 border flex flex-col items-start gap-2 w-full px-10 rounded-xl">
          <h2 className="font-bold text-xl">Хичээлийн тайлбар</h2>
          <span className="text-xl">
            Магадлалын үзэгдэл, тэдгээрийн төрөл, шинж чанарыг судална.
          </span>

          {/* жижиг info: яг аль SubModule дээр явж байгааг харуулах */}
          <div className="mt-3 text-sm text-gray-500">
            SubModule: <span className="font-semibold">{subModule.name}</span>
          </div>
        </div>
      </div>

      {/* teachers title */}
      <div className="mx-20 flex flex-col gap-3">
        <h2 className="font-bold text-xl">Бэлтгэсэн багш нар</h2>
        <span className="text-xl">
          Энэ хичээлийг бэлтгэсэн багш нарын жагсаалт. Багш дээр дарж материалыг
          үзнэ үү.
        </span>
      </div>

      {/* teachers list + add material */}
      <div className="mx-20 flex flex-wrap gap-10">
        {/* Teachers */}
        {teachers.length > 0 ? (
          teachers.map((t) => (
            <LessonCard
              key={t.id}
              // LessonCard чинь props авдаггүй байсан бол доорхыг тохируулна
              // Хамгийн багадаа name-г нь үзүүлэхэд хангалттай.
              teacher={{ id: t.id, name: t.name }}
              subModuleId={subModuleId}
            />
          ))
        ) : (
          <div className="w-full bg-white border rounded-xl p-6 text-gray-700">
            Энэ lesson дээр бүртгэлтэй багш олдсонгүй. (User.role='TEACHER' &
            lessonId тохирсон байх ёстой)
          </div>
        )}

        {/* Add Material Button */}
        {teacherId ? (
          <AddButton
            moduleId={moduleId}
            subModuleId={subModuleId}
            teacherId={teacherId}
            onSaved={() => {
              // Server component тул энд refresh хийхгүй.
              // Хэрвээ чи client wrapper ашиглавал router.refresh() хийж болно.
            }}
          />
        ) : (
          <div className="w-[370px] h-[280px] rounded border bg-white flex items-center justify-center text-gray-500">
            Материал нэмэхийн тулд эхлээд багш (TEACHER) бүртгэнэ үү.
          </div>
        )}
      </div>
    </div>
  );
}
