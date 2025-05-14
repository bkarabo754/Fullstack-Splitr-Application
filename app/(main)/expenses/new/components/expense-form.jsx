// FULL, REFINED, STYLED VERSION OF YOUR EXPENSE FORM

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Users,
  BadgeDollarSign,
  CalendarDays,
  CoinsIcon,
  UsersIcon,
  UserRoundPlusIcon,
} from 'lucide-react';

import { api } from '@/convex/_generated/api';
import { useConvexMutation, useConvexQuery } from '@/hooks/use-convex-query';
import { cn } from '@/lib/utils';
import { getAllCategories } from '@/lib/expense-categories';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

import { toast } from 'sonner';

import { ParticipantSelector } from './participant-selector';
import { GroupSelector } from './group-selector';
import { CategorySelector } from './category-selector';
import { SplitSelector } from './split-selector';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const expenseSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Amount must be a positive number',
    }),
  category: z.string().optional(),
  date: z.date(),
  paidByUserId: z.string().min(1, 'Payer is required'),
  splitType: z.enum(['equal', 'percentage', 'exact']),
  groupId: z.string().optional(),
});

export function ExpenseForm({ type, onSuccess }) {
  const [participants, setParticipants] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [splits, setSplits] = useState([]);

  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const createExpense = useConvexMutation(api.expenses.createExpense);
  const categories = getAllCategories();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: '',
      amount: '',
      category: '',
      date: new Date(),
      paidByUserId: currentUser?._id || '',
      splitType: 'equal',
      groupId: undefined,
    },
  });

  const amountValue = watch('amount');
  const paidByUserId = watch('paidByUserId');

  useEffect(() => {
    if (participants.length === 0 && currentUser) {
      setParticipants([
        {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
        },
      ]);
    }
  }, [currentUser, participants]);

  const onSubmit = async (data) => {
    try {
      const amount = parseFloat(data.amount);

      const formattedSplits = splits.map((split) => ({
        userId: split.userId,
        amount: split.amount,
        paid: split.userId === data.paidByUserId,
      }));

      const totalSplitAmount = formattedSplits.reduce(
        (sum, split) => sum + split.amount,
        0
      );
      const tolerance = 0.01;

      if (Math.abs(totalSplitAmount - amount) > tolerance) {
        toast.error('The split amounts do not add up to the total.');
        return;
      }

      const groupId = type === 'individual' ? undefined : data.groupId;

      await createExpense.mutate({
        description: data.description,
        amount: amount,
        category: data.category || 'Other',
        date: data.date.getTime(),
        paidByUserId: data.paidByUserId,
        splitType: data.splitType,
        splits: formattedSplits,
        groupId,
      });

      toast.success('Expense created successfully!');
      reset();

      const otherParticipant = participants.find(
        (p) => p.id !== currentUser._id
      );
      const otherUserId = otherParticipant?.id;

      if (onSuccess) onSuccess(type === 'individual' ? otherUserId : groupId);
    } catch (error) {
      toast.error('Failed to create expense: ' + error.message);
    }
  };

  if (!currentUser) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 max-w-4xl mx-auto"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          {/* <BadgeDollarSign className="h-7 w-7 text-green-500" /> */}
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">
            New Expense
          </h2>
          <Badge
            variant="outline"
            className="ml-auto bg-zinc-100 dark:bg-zinc-800 text-xs"
          >
            Smart Split
          </Badge>
        </div>

        {/* Description & Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g. Dinner at restaurant"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              placeholder="e.g. 50.00"
              type="number"
              step="0.01"
              {...register('amount')}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <CategorySelector
              categories={categories || []}
              onChange={(categoryId) => setValue('category', categoryId)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !selectedDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, 'PPP')
                  ) : (
                    <span className="text-muted-foreground">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setValue('date', date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Group Selector */}
        {type === 'group' && (
          <div className="space-y-2">
            <Label>Group</Label>
            <GroupSelector
              onChange={(group) => {
                if (!selectedGroup || selectedGroup.id !== group.id) {
                  setSelectedGroup(group);
                  setValue('groupId', group.id);
                  if (group.members && Array.isArray(group.members)) {
                    setParticipants(group.members);
                  }
                }
              }}
            />
            {!selectedGroup && (
              <p className="text-sm text-yellow-500">
                Select a group to proceed
              </p>
            )}
          </div>
        )}

        {/* Individual Participants */}
        {type === 'individual' && (
          <div className="space-y-2">
            <Label>Participants</Label>
            <ParticipantSelector
              participants={participants}
              onParticipantsChange={setParticipants}
            />
            {participants.length <= 1 && (
              <p className="text-sm text-yellow-500">
                Add at least one more participant
              </p>
            )}
          </div>
        )}

        {/* Paid By */}
        <div className="space-y-2">
          <Label>Paid by</Label>
          <Select
            onValueChange={(value) => setValue('paidByUserId', value)}
            defaultValue={paidByUserId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select who paid" />
            </SelectTrigger>
            <SelectContent>
              {participants.map((participant) => (
                <SelectItem key={participant.id} value={participant.id}>
                  {participant.id === currentUser._id
                    ? 'You'
                    : participant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.paidByUserId && (
            <p className="text-sm text-red-500">
              {errors.paidByUserId.message}
            </p>
          )}
        </div>

        {/* Split Type Tabs */}
        <div className="space-y-2">
          <Label>Split type</Label>
          <Tabs
            defaultValue="equal"
            onValueChange={(val) => setValue('splitType', val)}
            className="mt-2"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="equal">
                <CoinsIcon className="mr-1 h-4 w-4" /> Equal
              </TabsTrigger>
              <TabsTrigger value="percentage">
                <UsersIcon className="mr-1 h-4 w-4" /> Percentage
              </TabsTrigger>
              <TabsTrigger value="exact">
                <UserRoundPlusIcon className="mr-1 h-4 w-4" /> Exact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="equal" className="pt-4">
              <SplitSelector
                type="equal"
                amount={parseFloat(amountValue) || 0}
                participants={participants}
                paidByUserId={paidByUserId}
                onSplitsChange={setSplits}
              />
            </TabsContent>

            <TabsContent value="percentage" className="pt-4">
              <SplitSelector
                type="percentage"
                amount={parseFloat(amountValue) || 0}
                participants={participants}
                paidByUserId={paidByUserId}
                onSplitsChange={setSplits}
              />
            </TabsContent>

            <TabsContent value="exact" className="pt-4">
              <SplitSelector
                type="exact"
                amount={parseFloat(amountValue) || 0}
                participants={participants}
                paidByUserId={paidByUserId}
                onSplitsChange={setSplits}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-base rounded-xl font-semibold"
          >
            {isSubmitting ? 'Submitting...' : 'Add Expense'}
          </Button>
        </div>
      </div>
    </form>
  );
}
