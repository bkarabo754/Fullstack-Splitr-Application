'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { UserRoundCheck, Percent } from 'lucide-react';

export function SplitSelector({
  type,
  amount,
  participants,
  paidByUserId,
  onSplitsChange,
}) {
  const { user } = useUser();
  const [splits, setSplits] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate splits when inputs change
  useEffect(() => {
    if (!amount || amount <= 0 || participants.length === 0) {
      return;
    }

    let newSplits = [];

    if (type === 'equal') {
      // Equal splits
      const shareAmount = amount / participants.length;
      newSplits = participants.map((participant) => ({
        userId: participant.id,
        name: participant.name,
        email: participant.email,
        imageUrl: participant.imageUrl,
        amount: shareAmount,
        percentage: 100 / participants.length,
        paid: participant.id === paidByUserId,
      }));
    } else if (type === 'percentage') {
      // Initialize percentage splits evenly
      const evenPercentage = 100 / participants.length;
      newSplits = participants.map((participant) => ({
        userId: participant.id,
        name: participant.name,
        email: participant.email,
        imageUrl: participant.imageUrl,
        amount: (amount * evenPercentage) / 100,
        percentage: evenPercentage,
        paid: participant.id === paidByUserId,
      }));
    } else if (type === 'exact') {
      // Initialize exact splits evenly
      const evenAmount = amount / participants.length;
      newSplits = participants.map((participant) => ({
        userId: participant.id,
        name: participant.name,
        email: participant.email,
        imageUrl: participant.imageUrl,
        amount: evenAmount,
        percentage: (evenAmount / amount) * 100,
        paid: participant.id === paidByUserId,
      }));
    }

    setSplits(newSplits);

    // Calculate totals
    const newTotalAmount = newSplits.reduce(
      (sum, split) => sum + split.amount,
      0
    );
    const newTotalPercentage = newSplits.reduce(
      (sum, split) => sum + split.percentage,
      0
    );

    setTotalAmount(newTotalAmount);
    setTotalPercentage(newTotalPercentage);

    // Notify parent about the split changes
    if (onSplitsChange) {
      onSplitsChange(newSplits);
    }
  }, [type, amount, participants, paidByUserId, onSplitsChange]);

  // Update the percentage splits - no automatic adjustment of other values
  const updatePercentageSplit = (userId, newPercentage) => {
    // Update just this user's percentage and recalculate amount
    const updatedSplits = splits.map((split) => {
      if (split.userId === userId) {
        return {
          ...split,
          percentage: newPercentage,
          amount: (amount * newPercentage) / 100,
        };
      }
      return split;
    });

    setSplits(updatedSplits);

    // Recalculate totals
    const newTotalAmount = updatedSplits.reduce(
      (sum, split) => sum + split.amount,
      0
    );
    const newTotalPercentage = updatedSplits.reduce(
      (sum, split) => sum + split.percentage,
      0
    );

    setTotalAmount(newTotalAmount);
    setTotalPercentage(newTotalPercentage);

    // Notify parent about the split changes
    if (onSplitsChange) {
      onSplitsChange(updatedSplits);
    }
  };

  // Update the exact amount splits - no automatic adjustment of other values
  const updateExactSplit = (userId, newAmount) => {
    const parsedAmount = parseFloat(newAmount) || 0;

    // Update just this user's amount and recalculate percentage
    const updatedSplits = splits.map((split) => {
      if (split.userId === userId) {
        return {
          ...split,
          amount: parsedAmount,
          percentage: amount > 0 ? (parsedAmount / amount) * 100 : 0,
        };
      }
      return split;
    });

    setSplits(updatedSplits);

    // Recalculate totals
    const newTotalAmount = updatedSplits.reduce(
      (sum, split) => sum + split.amount,
      0
    );
    const newTotalPercentage = updatedSplits.reduce(
      (sum, split) => sum + split.percentage,
      0
    );

    setTotalAmount(newTotalAmount);
    setTotalPercentage(newTotalPercentage);

    // Notify parent about the split changes
    if (onSplitsChange) {
      onSplitsChange(updatedSplits);
    }
  };

  // Check if totals are valid
  const isPercentageValid = Math.abs(totalPercentage - 100) < 0.01;
  const isAmountValid = Math.abs(totalAmount - amount) < 0.01;

  return (
    <div className="space-y-6 mt-6">
      {splits.map((split) => (
        <div
          key={split.userId}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/40 p-4 rounded-xl shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-0 sm:min-w-[150px]">
            <Avatar className="h-9 w-9">
              <AvatarImage src={split.imageUrl} />
              <AvatarFallback>{split.name?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">
                {split.userId === user?.id ? 'You' : split.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {split.email}
              </span>
            </div>
            {split.paid && (
              <Badge variant="secondary" className="ml-2">
                <UserRoundCheck className="w-3.5 h-3.5 mr-1" />
                Paid
              </Badge>
            )}
          </div>

          {type === 'equal' && (
            <div className="text-sm text-right font-medium">
              R{split.amount.toFixed(2)}{' '}
              <span className="text-muted-foreground">
                ({split.percentage.toFixed(1)}%)
              </span>
            </div>
          )}

          {type === 'percentage' && (
            <div className="flex items-center gap-3 flex-1">
              <Slider
                value={[split.percentage]}
                min={0}
                max={100}
                step={1}
                onValueChange={(val) =>
                  updatePercentageSplit(split.userId, val[0])
                }
                className="flex-1"
              />
              <div className="flex items-center gap-1">
                <Percent className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={split.percentage.toFixed(1)}
                  onChange={(e) =>
                    updatePercentageSplit(
                      split.userId,
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-20 h-8 text-sm"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                R{split.amount.toFixed(2)}
              </span>
            </div>
          )}

          {type === 'exact' && (
            <div className="flex items-center gap-3 flex-1">
              <Input
                type="number"
                min="0"
                max={amount * 2}
                step="0.01"
                value={split.amount.toFixed(2)}
                onChange={(e) => updateExactSplit(split.userId, e.target.value)}
                className="w-24 h-8 text-sm"
              />
              <span className="text-sm text-muted-foreground">
                ({split.percentage.toFixed(1)}%)
              </span>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center border-t pt-4 mt-4">
        <span className="font-semibold text-sm text-muted-foreground">
          Total
        </span>
        <div className="text-right">
          <span
            className={`font-medium ${
              !isAmountValid ? 'text-red-600' : 'text-foreground'
            }`}
          >
            R{totalAmount.toFixed(2)}
          </span>
          {type !== 'equal' && (
            <span
              className={`text-sm ml-2 ${
                !isPercentageValid ? 'text-red-600' : 'text-muted-foreground'
              }`}
            >
              ({totalPercentage.toFixed(1)}%)
            </span>
          )}
        </div>
      </div>

      {!isPercentageValid && type === 'percentage' && (
        <p className="text-sm text-red-600 mt-1">
          Percentages must add up to 100%.
        </p>
      )}

      {!isAmountValid && type === 'exact' && (
        <p className="text-sm text-red-600 mt-1">
          The split total (R{totalAmount.toFixed(2)}) must match the total
          amount (R{amount.toFixed(2)}).
        </p>
      )}
    </div>
  );
}
