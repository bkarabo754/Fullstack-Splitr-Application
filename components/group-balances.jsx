'use client';

import { useConvexQuery } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GroupBalances({ balances }) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  if (!balances?.length || !currentUser) {
    return (
      <div className="text-center py-6 text-muted-foreground text-sm italic">
        No balance information available
      </div>
    );
  }

  const me = balances.find((b) => b.id === currentUser._id);
  if (!me) {
    return (
      <div className="text-center py-6 text-muted-foreground text-sm italic">
        You’re not part of this group
      </div>
    );
  }

  const userMap = Object.fromEntries(balances.map((b) => [b.id, b]));
  const owedByMembers = me.owedBy
    .map(({ from, amount }) => ({ ...userMap[from], amount }))
    .sort((a, b) => b.amount - a.amount);

  const owingToMembers = me.owes
    .map(({ to, amount }) => ({ ...userMap[to], amount }))
    .sort((a, b) => b.amount - a.amount);

  const isAllSettledUp =
    me.totalBalance === 0 &&
    owedByMembers.length === 0 &&
    owingToMembers.length === 0;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Total balance summary */}
      <div className="text-center pb-6 border-b dark:border-muted border-gray-200">
        <p className="text-sm text-muted-foreground mb-1">Your balance</p>
        <p
          className={cn(
            'text-3xl font-bold tracking-tight',
            me.totalBalance > 0
              ? 'text-emerald-500'
              : me.totalBalance < 0
                ? 'text-rose-500'
                : 'text-muted-foreground'
          )}
        >
          {me.totalBalance > 0
            ? `+R${me.totalBalance.toFixed(2)}`
            : me.totalBalance < 0
              ? `-R${Math.abs(me.totalBalance).toFixed(2)}`
              : 'R0.00'}
        </p>
        <p className="text-sm mt-2 text-muted-foreground">
          {me.totalBalance > 0
            ? 'You are owed money'
            : me.totalBalance < 0
              ? 'You owe money'
              : 'You are all settled up'}
        </p>
      </div>

      {isAllSettledUp ? (
        <div className="text-center py-6 text-muted-foreground">
          🎉 Everyone is settled up!
        </div>
      ) : (
        <div className="space-y-8">
          {/* Members who owe you */}
          {owedByMembers.length > 0 && (
            <div>
              <h3 className="text-base font-medium flex items-center gap-2 mb-4">
                <ArrowUpCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-emerald-700 dark:text-emerald-400">
                  Balance Owed to you
                </span>
              </h3>

              <div className="space-y-4">
                {owedByMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between px-4 py-3 rounded-lg border bg-white dark:bg-muted shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-9 w-9 ring ring-emerald-300 ring-offset-2">
                          <AvatarImage src={member.imageUrl} />
                          <AvatarFallback>
                            {member.name?.charAt(0) ?? '?'}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{member.name}</p>
                        <Badge
                          variant="outline"
                          className="text-xs bg-emerald-50 text-emerald-600 border-emerald-200 mt-1"
                        >
                          Owes you
                        </Badge>
                      </div>
                    </div>
                    <div className="text-emerald-600 font-medium">
                      R{member.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Members you owe */}
          {owingToMembers.length > 0 && (
            <div>
              <h3 className="text-base font-medium flex items-center gap-2 mb-4">
                <ArrowDownCircle className="h-5 w-5 text-rose-500" />
                <span className="text-rose-700 dark:text-rose-400">
                  You owe
                </span>
              </h3>

              <div className="space-y-4">
                {owingToMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between px-4 py-3 rounded-lg border bg-white dark:bg-muted shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-9 w-9 ring ring-rose-300 ring-offset-2">
                          <AvatarImage src={member.imageUrl} />
                          <AvatarFallback>
                            {member.name?.charAt(0) ?? '?'}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{member.name}</p>
                        <Badge
                          variant="outline"
                          className="text-xs bg-rose-50 text-rose-600 border-rose-200 mt-1"
                        >
                          You owe
                        </Badge>
                      </div>
                    </div>
                    <div className="text-rose-600 font-medium">
                      R{member.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
