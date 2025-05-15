import { ExpenseList } from '@/components/expense-list';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { SettlementList } from '../settlements/[type]/[id]/settlement-components/settlement-list';

export default function GroupTabs({
  activeTab,
  setActiveTab,
  expenses,
  settlements,
  userLookupMap,
}) {
  return (
    <Tabs
      defaultValue="expenses"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6"
      aria-label="Group expense and settlement tabs"
    >
      <TabsList className="grid w-full grid-cols-2 rounded-lg shadow-sm bg-muted/30">
        <TabsTrigger value="expenses">
          Expenses{' '}
          <Badge className="ml-2" variant="secondary">
            {expenses.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="settlements">
          Settlements{' '}
          <Badge className="ml-2" variant="secondary">
            {settlements.length}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="expenses" className="space-y-4">
        {expenses.length > 0 ? (
          <ExpenseList
            expenses={expenses}
            showOtherPerson
            isGroupExpense
            userLookupMap={userLookupMap}
          />
        ) : (
          <p className="text-muted-foreground italic text-center py-6">
            No expenses recorded yet.
          </p>
        )}
      </TabsContent>

      <TabsContent value="settlements" className="space-y-4">
        {settlements.length > 0 ? (
          <SettlementList
            settlements={settlements}
            isGroupSettlement
            userLookupMap={userLookupMap}
          />
        ) : (
          <p className="text-muted-foreground italic text-center py-6">
            No settlements made yet.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
}
