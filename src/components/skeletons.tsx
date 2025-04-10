import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentlyPlayedSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="overflow-hidden bg-none border-none shadow-none"
        >
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="relative aspect-square rounded-lg overflow-hidden ring-1 ring-border/50">
                <Skeleton className="w-full h-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function TopTracksSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className="overflow-hidden bg-none border-none shadow-none"
        >
          <CardContent>
            <div className="flex gap-4">
              <div className="relative size-16 flex-shrink-0 rounded-lg overflow-hidden ring-1 ring-border/50">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="w-1/2 flex flex-col justify-center min-w-0">
                <Skeleton className="h-6 w-full mb-1 lg:h-7" />
                <Skeleton className="h-4 w-3/4 lg:h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
