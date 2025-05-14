'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/convex/_generated/api';
import { useConvexMutation, useConvexQuery } from '@/hooks/use-convex-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Form schema validation
const settlementSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Amount must be a positive number',
    }),
  note: z.string().optional(),
  paymentType: z.enum(['youPaid', 'theyPaid']),
});

export default function SettlementForm({ entityType, entityData, onSuccess }) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const createSettlement = useConvexMutation(api.settlements.createSettlement);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settlementSchema),
    defaultValues: {
      amount: '',
      note: '',
      paymentType: 'youPaid',
    },
  });

  const paymentType = watch('paymentType');
  const [selectedGroupMemberId, setSelectedGroupMemberId] = useState(null);

  // Define outside conditional block
  const otherUser = entityType === 'user' ? entityData.counterpart : null;
  const netBalance = entityType === 'user' ? entityData.netBalance : 0;

  const handleUserSettlement = async (data) => {
    const amount = parseFloat(data.amount);

    try {
      const paidByUserId =
        data.paymentType === 'youPaid'
          ? currentUser._id
          : entityData.counterpart.userId;

      const receivedByUserId =
        data.paymentType === 'youPaid'
          ? entityData.counterpart.userId
          : currentUser._id;

      await createSettlement.mutate({
        amount,
        note: data.note,
        paidByUserId,
        receivedByUserId,
      });

      toast.success('Settlement recorded successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Failed to record settlement: ' + error.message);
    }
  };

  const handleGroupSettlement = async (data, selectedUserId) => {
    if (!selectedUserId) {
      toast.error('Please select a group member to settle with');
      return;
    }

    const amount = parseFloat(data.amount);

    try {
      const selectedUser = entityData.balances.find(
        (balance) => balance.userId === selectedUserId
      );

      if (!selectedUser) {
        toast.error('Selected user not found in group');
        return;
      }

      const paidByUserId =
        data.paymentType === 'youPaid' ? currentUser._id : selectedUser.userId;

      const receivedByUserId =
        data.paymentType === 'youPaid' ? selectedUser.userId : currentUser._id;

      await createSettlement.mutate({
        amount,
        note: data.note,
        paidByUserId,
        receivedByUserId,
        groupId: entityData.group.id,
      });

      toast.success('Settlement recorded successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Failed to record settlement: ' + error.message);
    }
  };

  const onSubmit = async (data) => {
    if (entityType === 'user') {
      await handleUserSettlement(data);
    } else if (entityType === 'group' && selectedGroupMemberId) {
      await handleGroupSettlement(data, selectedGroupMemberId);
    }
  };

  if (!currentUser) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white/5 p-6 rounded-2xl shadow-xl border border-border max-w-xl mx-auto"
    >
      {/* Balance Overview */}
      {entityType === 'user' && otherUser && (
        <div className="bg-muted/40 p-5 rounded-xl border">
          <h3 className="font-semibold text-lg text-muted-foreground mb-2 flex items-center gap-2">
            Current Balance
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border">
              with {otherUser.name}
            </span>
          </h3>
          {netBalance === 0 ? (
            <p className="text-sm text-muted-foreground">
              You are all settled up 🎉
            </p>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                {netBalance > 0 ? (
                  <>
                    <span className="font-semibold">{otherUser.name}</span> owes
                    you
                  </>
                ) : (
                  <>
                    You owe{' '}
                    <span className="font-semibold">{otherUser.name}</span>
                  </>
                )}
              </p>
              <span
                className={`text-lg font-bold px-3 py-1 rounded-md ${
                  netBalance > 0
                    ? 'text-green-600 bg-green-100'
                    : 'text-red-600 bg-red-100'
                }`}
              >
                R{Math.abs(netBalance).toFixed(2)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Who Paid? */}
      <div className="space-y-3">
        <Label className="font-semibold text-sm">Who paid?</Label>
        <RadioGroup
          defaultValue="youPaid"
          className="space-y-3"
          onValueChange={(value) =>
            register('paymentType').onChange({
              target: { name: 'paymentType', value },
            })
          }
        >
          <div className="flex items-center p-4 rounded-lg border gap-3 hover:bg-muted/40 transition-all cursor-pointer">
            <RadioGroupItem value="youPaid" id="youPaid" />
            <Label htmlFor="youPaid" className="flex-grow cursor-pointer">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={currentUser.imageUrl} />
                  <AvatarFallback>{currentUser.name?.[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">You paid {otherUser?.name}</span>
              </div>
            </Label>
          </div>

          <div className="flex items-center p-4 rounded-lg border gap-3 hover:bg-muted/40 transition-all cursor-pointer">
            <RadioGroupItem value="theyPaid" id="theyPaid" />
            <Label htmlFor="theyPaid" className="flex-grow cursor-pointer">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={otherUser?.imageUrl} />
                  <AvatarFallback>{otherUser?.name?.[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{otherUser?.name} paid you</span>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="font-semibold text-sm">
          Amount
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">
            R
          </span>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0.01"
            {...register('amount')}
            className="pl-7"
          />
        </div>
        {errors.amount && (
          <p className="text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      {/* Note */}
      <div className="space-y-2">
        <Label htmlFor="note" className="font-semibold text-sm">
          Note <span className="text-muted-foreground text-xs">(optional)</span>
        </Label>
        <Textarea
          id="note"
          placeholder="Dinner, rent, transport..."
          {...register('note')}
          className="resize-none"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full text-base font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Recording...' : 'Record Settlement'}
      </Button>
    </form>
  );
}
