import { ArrowUpCircle } from 'lucide-react';
import BalanceList from './BalanceList';

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
        <BalanceList
          title="Owed to you"
          icon={{
            component: <ArrowUpCircle className="h-4 w-4 text-green-500" />,
          }}
          balances={oweDetails.youAreOwedBy}
          amountClass="text-green-600"
        />
      )}

      {hasOwing && (
        <BalanceList
          title="You owe"
          icon={{
            component: <ArrowDownCircle className="h-4 w-4 text-red-500" />,
          }}
          balances={oweDetails.youOwe}
          amountClass="text-red-600"
        />
      )}
    </div>
  );
}
