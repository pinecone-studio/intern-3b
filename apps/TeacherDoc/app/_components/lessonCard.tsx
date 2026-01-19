'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/buttton';

type LessonCardProps = {
  teacher: {
    id: string;
    name: string;
    number?: number | null;
    createdAt?: string | Date | null;
    phone?: string | null; // чи db дээр phone байхгүй тул түр optional
    avatarBase64?: string | null; // хүсвэл энд дамжуулж болно
  };
  subModuleId: string;
};

const DEFAULT_AVATAR =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFhUXGBcXGBgYFx0gGhsXGRgdHRgeHSAYHSggGxolHRodITEhJykrLi4uGh8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tNTUtLS0vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAEAgMFBgABBwj/xABKEAACAAMFBAYGBwUGBQUBAAABAgADEQQFEiExBkFRYRMicYGRoQcyUrHB8BQVQmJyktEjgqLS4RYzQ3Oy8SRTY5PCFzQ2VLMI/8QAGwEAAgMBAQEAAAAAAAAAAAAAAgMAAQQFBgf/xAA5EQACAQIEAggGAQIGAwEAAAAAAQIDEQQSITFBUQUTImFxgaHwFDKRscHR4QbxIzNCUmKSFXKiY//aAAwDAQACEQMRAD8A...'; // (Чиний base64 урт байсан тул энд “...” гэж богиносголоо)
// ⚠️ Чи өөрийнхөө бүтэн base64-аа энд paste хийгээд “...” хэсгийг солиход болно.

function formatDate(d?: string | Date | null) {
  if (!d) return '-';
  const date = typeof d === 'string' ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
}

export function LessonCard({ teacher, subModuleId }: LessonCardProps) {
  const router = useRouter();

  const avatarSrc = teacher.avatarBase64 || DEFAULT_AVATAR;
  const phoneText =
    teacher.phone ?? (teacher.number ? String(teacher.number) : '99009900'); // түр fallback

  return (
    <div className="flex gap-10">
      <div className="flex px-[30px] py-[50px] flex-col w-[370px] rounded border bg-white h-[280px]">
        {/* profile image */}
        <div className="gap-4 h-20 flex">
          <img
            src={avatarSrc}
            alt="teacher"
            className="w-[80px] h-[80px] rounded-full object-cover"
          />

          <div>
            <h2 className="font-bold text-xl">Бэлтгэсэн багш</h2>
            <span className="text-xl">{teacher.name || 'Багш'}</span>
          </div>
        </div>

        <p className="mt-4 font-sans">Утасны дугаар: {phoneText}</p>
        <p className="font-sans">
          Үүссэн хугацаа: {formatDate(teacher.createdAt) || '2026-01-14'}
        </p>

        <Button
          className="mt-4"
          onClick={() => {
            // ✅ өөрийн route-аа энд тохируул
            // жишээ: /subModule/[id]/teacher/[teacherId]
            router.push(`/subModule/${subModuleId}/teacher/${teacher.id}`);
          }}
        >
          Хичээл харах
        </Button>
      </div>
    </div>
  );
}
