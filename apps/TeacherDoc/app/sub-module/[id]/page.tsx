import { LessonCard } from '@/app/_components/lessonCard';

export default function SubModulePage() {
  return (
    <div className="flex flex-col gap-10 h-screen bg-blue-50 justify-start">
      {/* lesson description  */}
      <div className=" mt-10 mx-20">
        <div className="bg-white py-5 border flex flex-col items-start gap-8 w-full px-10 rounded-xl">
          <h2 className="font-bold text-xl">Хичээлийн тайлбар</h2>
          <span className="text-xl  ">
            Магадлалын үзэгдэл, тэдгээрийн төрөл, шинж чанарыг судална.
          </span>
        </div>
      </div>

      {/* lessons */}

      {/* lessons title */}
      <div className="mx-20 flex flex-col gap-3">
        <h2 className="font-bold text-xl">Бэлтгэсэн багш нар</h2>
        <span className="text-xl  ">
          Энэ хичээлийг бэлтгэсэн багш нарын жагсаалт. Багш дээр дарж материалыг
          үзнэ үү.
        </span>
      </div>

      <div className="mx-20">
        <LessonCard />
      </div>
    </div>
  );
}
