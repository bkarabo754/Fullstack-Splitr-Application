'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assumes you have a classNames utility

export function BalanceSummary({ balances }) {
  if (!balances) return null;

  const { oweDetails } = balances;
  const hasOwed = oweDetails.youAreOwedBy.length > 0;
  const hasOwing = oweDetails.youOwe.length > 0;

  return (
    <div className="space-y-6">
      {!hasOwed && !hasOwing && (
        <div className="text-center py-6">
          <p className="text-muted-foreground">You're all settled up!</p>
        </div>
      )}

      {hasOwed && (
        <div>
          <h3 className="text-sm font-medium flex items-center mb-3">
            <ArrowUpCircle className="h-4 w-4 text-green-500 mr-2" />
            Owed to you
          </h3>
          <div className="space-y-3">
            {oweDetails.youAreOwedBy.map((item) => {
              const delta = item?.delta || 0;

              return (
                <Link
                  href={`/person/${item.userId}`}
                  key={item.userId}
                  className="flex items-center justify-between hover:bg-muted p-3 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={item.imageUrl} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
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
                  <span className="font-semibold text-green-600">
                    R{item.amount.toFixed(2)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {hasOwing && (
        <div>
          <h3 className="text-sm font-medium flex items-center mb-3">
            <ArrowDownCircle className="h-4 w-4 text-red-500 mr-2" />
            You owe
          </h3>
          <div className="space-y-3">
            {oweDetails.youOwe.map((item) => {
              const delta = item?.delta || 0;

              return (
                <Link
                  href={`/person/${item.userId}`}
                  key={item.userId}
                  className="flex items-center justify-between hover:bg-muted p-3 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={item.imageUrl} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
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
                  <span className="font-semibold text-red-600">
                    R{item.amount.toFixed(2)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
