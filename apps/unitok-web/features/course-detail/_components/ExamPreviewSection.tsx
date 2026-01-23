'use client';

import { Button } from '@intern-3b/shadcn';
import { ExamInfo } from '../../exam-info/type';
import { ExamPreviewCard } from './ExamPreviewCard';

interface ExamPreviewSectionProps {
  examInfos: ExamInfo[];
  onViewAll: () => void;
}

export function ExamPreviewSection({
  examInfos,
  onViewAll,
}: ExamPreviewSectionProps) {
  const previewExam = examInfos[0];

  return (
    <div className="px-4 py-4 border-b border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-foreground">
          Шалгалтын мэдээлэл
        </h3>
        <span className="text-xs text-muted-foreground">
          {examInfos.length} мэдээлэл
        </span>
      </div>

      {previewExam && <ExamPreviewCard exam={previewExam} />}

      <Button
        onClick={onViewAll}
        variant="outline"
        className="w-full cursor-pointer bg-transparent"
      >
        Бүх шалгалтын мэдээлэл харах
      </Button>
    </div>
  );
}
