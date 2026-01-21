import type { CourseInfoData } from '../type';

interface CourseInfoSectionProps {
  courseInfoData: CourseInfoData;
}

export function CourseInfoSection({ courseInfoData }: CourseInfoSectionProps) {
  return (
    <div className="px-4 py-4 border-b border-border">
      <h3 className="text-sm font-bold text-foreground mb-3">
        Хичээлийн мэдээлэл
      </h3>
      <div className="space-y-4">
        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            Даалгавар
          </div>
          <div className="space-y-1.5">
            {courseInfoData.assignment.choices.map((choice) => (
              <div key={choice.label} className="flex items-center gap-2">
                <span className="text-xs text-foreground w-16">
                  {choice.label}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground/20 rounded-full transition-all"
                    style={{ width: `${choice.percentage}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-10 text-right">
                  {choice.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            Багийн ажил
          </div>
          <div className="space-y-1.5">
            {courseInfoData.groupWork.choices.map((choice) => (
              <div key={choice.label} className="flex items-center gap-2">
                <span className="text-xs text-foreground w-16">
                  {choice.label}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground/20 rounded-full transition-all"
                    style={{ width: `${choice.percentage}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-10 text-right">
                  {choice.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            Дүн авахад
          </div>
          <div className="space-y-1.5">
            {courseInfoData.grading.choices.map((choice) => (
              <div key={choice.label} className="flex items-center gap-2">
                <span className="text-xs text-foreground w-16">
                  {choice.label}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground/20 rounded-full transition-all"
                    style={{ width: `${choice.percentage}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-10 text-right">
                  {choice.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-2 px-3 bg-accent/30 rounded-lg">
          <span className="text-sm text-foreground">Ирц</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-foreground">
              {courseInfoData.attendance.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {courseInfoData.attendance.count} хүн
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 px-3 bg-accent/30 rounded-lg">
          <span className="text-sm text-foreground">Шалгалт</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-foreground">
              {courseInfoData.examCount.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {courseInfoData.examCount.count} хүн
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
