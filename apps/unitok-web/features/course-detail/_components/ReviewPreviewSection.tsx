'use client';

import { Star } from 'lucide-react';
import type { Review } from '../type';
import { ReviewPreviewItem } from './ReviewPreviewItem';
import { Button } from '@intern-3b/shadcn';

interface ReviewPreviewSectionProps {
  reviews: Review[];
  onViewAll: () => void;
}

export function ReviewPreviewSection({
  reviews,
  onViewAll,
}: ReviewPreviewSectionProps) {
  return (
    <div className="px-4 py-3 border-b border-border">
      <h3 className="text-sm font-bold text-foreground mb-2">Үнэлгээнүүд</h3>
      {reviews.length === 0 ? (
        <div className="py-8 text-center">
          <Star className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Үнэлгээ байхгүй байна</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {reviews.slice(0, 1).map((review) => (
              <ReviewPreviewItem key={review.id} review={review} />
            ))}
          </div>
          <Button
            onClick={onViewAll}
            variant="outline"
            className="w-full mt-3 cursor-pointer bg-transparent"
          >
            Үнэлгээ дэлгэрэнгүй харах
          </Button>
        </>
      )}
    </div>
  );
}
