'use client';

import { useConvexQuery } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftRight } from 'lucide-react';

export function SettlementList({
  settlements,
  isGroupSettlement = false,
  userLookupMap,
}) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  if (!settlements || settlements.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          <ArrowLeftRight className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
          <p className="text-lg font-semibold">No settlements found</p>
          <p className="text-sm text-muted-foreground">
            Everything’s balanced!
          </p>
        </CardContent>
      </Card>
    );
  }

  const getUserDetails = (userId) => {
    return {
      name:
        userId === currentUser?._id
          ? 'You'
          : userLookupMap[userId]?.name || 'Unknown User',
      imageUrl: null,
      id: userId,
    };
  };

  return (
    <div className="flex flex-col gap-5">
      {settlements.map((settlement) => {
        const payer = getUserDetails(settlement.paidByUserId);
        const receiver = getUserDetails(settlement.receivedByUserId);
        const isCurrentUserPayer = settlement.paidByUserId === currentUser?._id;
        const isCurrentUserReceiver =
          settlement.receivedByUserId === currentUser?._id;

        return (
          <Card
            key={settlement._id}
            className="transition-all duration-300 border border-border hover:shadow-lg hover:scale-[1.01]"
          >
            <CardContent className="py-5 px-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                {/* Icon & Info */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ArrowLeftRight className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base leading-5">
                      {isCurrentUserPayer
                        ? `You paid ${receiver.name}`
                        : isCurrentUserReceiver
                          ? `${payer.name} paid you`
                          : `${payer.name} paid ${receiver.name}`}
                    </h3>
                    <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                      <span>
                        {format(new Date(settlement.date), 'MMM d, yyyy')}
                      </span>
                      {settlement.note && (
                        <>
                          <span>•</span>
                          <span className="italic text-xs">
                            {settlement.note}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Amount & Status */}
                <div className="text-right space-y-1 min-w-[110px]">
                  <div
                    className={`font-bold text-lg ${
                      isCurrentUserReceiver
                        ? 'text-red-600'
                        : isCurrentUserPayer
                          ? 'text-green-600'
                          : 'text-primary'
                    }`}
                  >
                    R{settlement.amount.toFixed(2)}
                  </div>
                  {isGroupSettlement ? (
                    <Badge variant="secondary" className="text-xs">
                      Group Settlement
                    </Badge>
                  ) : (
                    <Badge
                      className={`text-xs ${
                        isCurrentUserPayer
                          ? 'bg-green-100 text-green-700'
                          : isCurrentUserReceiver
                            ? 'bg-green-100 text-green-700'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCurrentUserPayer
                        ? 'You Paid'
                        : isCurrentUserReceiver
                          ? 'You Received'
                          : 'Payment'}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
