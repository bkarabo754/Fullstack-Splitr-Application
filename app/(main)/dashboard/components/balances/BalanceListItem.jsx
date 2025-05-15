import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BalanceListItem({
  userId,
  name,
  imageUrl,
  delta,
  amount,
  amountClass,
}) {
  return (
    <Link
      href={`/person/${userId}`}
      className="flex items-center justify-between hover:bg-muted p-3 rounded-md transition-colors"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <span
            className={cn(
              'text-xs font-semibold mt-1 px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm',
              delta >= 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            )}
          >
            {delta >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(delta)}%
          </span>
        </div>
      </div>
      <span className={`font-semibold ${amountClass}`}>
        R{amount.toFixed(2)}
      </span>
    </Link>
  );
}
