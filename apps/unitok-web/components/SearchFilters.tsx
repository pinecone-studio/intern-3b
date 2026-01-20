'use client';

interface SearchFiltersProps {
  searchType: 'course' | 'professor';
  onChange: (type: 'course' | 'professor') => void;
}

export function SearchFilters({ searchType, onChange }: SearchFiltersProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onChange('course')}
        className={`flex items-center gap-2 ${searchType === 'course' ? 'text-foreground' : 'text-muted-foreground'}`}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${searchType === 'course' ? 'border-primary' : 'border-muted-foreground'}`}
        >
          {searchType === 'course' && (
            <div className="w-2 h-2 rounded-full bg-primary" />
          )}
        </div>
        <span className="text-sm">Хичээл</span>
      </button>
      <button
        onClick={() => onChange('professor')}
        className={`flex items-center gap-2 ${searchType === 'professor' ? 'text-foreground' : 'text-muted-foreground'}`}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${searchType === 'professor' ? 'border-primary' : 'border-muted-foreground'}`}
        >
          {searchType === 'professor' && (
            <div className="w-2 h-2 rounded-full bg-primary" />
          )}
        </div>
        <span className="text-sm">Багш</span>
      </button>
    </div>
  );
}
