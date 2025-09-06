import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  score: number;
  totalStars?: number;
  className?: string;
}

export function StarRating({ score, totalStars = 5, className }: StarRatingProps) {
  const fullStars = Math.floor(score);
  const halfStar = score - fullStars >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-accent fill-accent" />
      ))}
      {halfStar && <StarHalf key="half" className="w-4 h-4 text-accent fill-accent" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/50 fill-muted-foreground/20" />
      ))}
    </div>
  );
}
