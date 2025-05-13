'use client';

import Link from 'next/link';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function GroupList({ groups }) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-lg font-medium">
          No groups yet
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Create a group to start tracking shared expenses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const balance = group.balance || 0;
        const hasBalance = balance !== 0;

        return (
          <Link
            href={`/groups/${group.id}`}
            key={group.id}
            className={cn(
              'flex items-center justify-between p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300',
              'bg-background hover:bg-muted/70'
            )}
          >
            {/* Group Info */}
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-base">{group.name}</p>
                <p className="text-sm text-muted-foreground">
                  {group.members.length} member
                  {group.members.length !== 1 && 's'}
                </p>
              </div>
            </div>

            {/* Balance Badge */}
            {hasBalance && (
              <Badge
                variant="outline"
                className={cn(
                  'text-sm font-medium px-3 py-1 border rounded-full',
                  balance > 0
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-red-100 text-red-700 border-red-300'
                )}
              >
                {balance > 0 ? '+' : ''}R{balance.toFixed(2)}
              </Badge>
            )}
          </Link>
        );
      })}
    </div>
  );
}
