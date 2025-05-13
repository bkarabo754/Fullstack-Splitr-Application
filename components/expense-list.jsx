'use client';

import { useState } from 'react';
import { useConvexQuery, useConvexMutation } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getCategoryById, getCategoryIcon } from '@/lib/expense-categories';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function ExpenseList({
  expenses,
  showOtherPerson = true,
  isGroupExpense = false,
  otherPersonId = null,
  userLookupMap = {},
}) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const deleteExpense = useConvexMutation(api.expenses.deleteExpense);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  if (!expenses?.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground text-lg">
          No expenses recorded yet.
        </CardContent>
      </Card>
    );
  }

  const getUserDetails = (userId) => ({
    name:
      userId === currentUser?._id
        ? 'You'
        : userLookupMap[userId]?.name || 'Unknown User',
    imageUrl: userLookupMap[userId]?.imageUrl || null,
    id: userId,
  });

  const canDeleteExpense = (expense) => {
    if (!currentUser) return false;
    return (
      expense.createdBy === currentUser._id ||
      expense.paidByUserId === currentUser._id
    );
  };

  const handleConfirmDelete = async () => {
    if (!selectedExpense) return;
    try {
      await deleteExpense.mutate({ expenseId: selectedExpense._id });
      toast.success('Expense deleted successfully');
    } catch (error) {
      toast.error('Failed to delete expense: ' + error.message);
    } finally {
      setOpenDialog(false);
      setSelectedExpense(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {expenses.map((expense) => {
          const payer = getUserDetails(expense.paidByUserId);
          const isCurrentUserPayer = payer.id === currentUser?._id;
          const category = getCategoryById(expense.category);
          const CategoryIcon = getCategoryIcon(category.id);
          const showDeleteOption = canDeleteExpense(expense);

          return (
            <Card
              key={expense._id}
              className="transition-all hover:shadow-xl hover:bg-muted/30 border border-border rounded-xl"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full shadow-lg">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {expense.description}
                      </h3>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>
                          {format(new Date(expense.date), 'MMM d, yyyy')}
                        </span>
                        {showOtherPerson && (
                          <>
                            <span>•</span>
                            <span>
                              {isCurrentUserPayer ? 'You' : payer.name} paid
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div className="text-xl font-semibold text-foreground">
                        R{expense.amount.toFixed(2)}
                      </div>
                      {isGroupExpense ? (
                        <Badge variant="outline" className="mt-1 text-sm">
                          Group expense
                        </Badge>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          {isCurrentUserPayer ? (
                            <span className="text-green-600 font-medium">
                              You paid
                            </span>
                          ) : (
                            <span className="text-red-500">
                              {payer.name} paid
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {showDeleteOption && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 transition duration-300 cursor-pointer"
                            onClick={() => {
                              setSelectedExpense(expense);
                              setOpenDialog(true);
                            }}
                          >
                            <Trash2 className="text-red-500 w-4 h-4 " />
                            <span className="sr-only">Delete Expense</span>
                          </Button>
                        </AlertDialogTrigger>
                      </AlertDialog>
                    )}
                  </div>
                </div>

                {/* Splits Display */}
                <div className="flex flex-wrap gap-2">
                  {expense.splits.map((split, index) => {
                    const user = getUserDetails(split.userId);
                    const isCurrentUser = user.id === currentUser?._id;
                    const shouldShow =
                      showOtherPerson ||
                      (!showOtherPerson &&
                        (user.id === currentUser?._id ||
                          user.id === otherPersonId));

                    if (!shouldShow) return null;

                    return (
                      <Badge
                        key={index}
                        variant={split.paid ? 'outline' : 'secondary'}
                        className="px-2 py-1 rounded-full flex items-center gap-1.5"
                      >
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={user.imageUrl} />
                          <AvatarFallback>
                            {user.name?.charAt(0) || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <span>
                          {isCurrentUser ? 'You' : user.name}: R
                          {split.amount.toFixed(2)}
                        </span>
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Shared AlertDialog outside loop */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
