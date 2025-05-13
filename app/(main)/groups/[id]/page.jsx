'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { BarLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PlusCircle,
  ArrowLeftRight,
  ArrowLeft,
  Users,
  Share2,
} from 'lucide-react';
import { ExpenseList } from '@/components/expense-list';
import { SettlementList } from '@/components/settlement-list';
import { GroupBalances } from '@/components/group-balances';
import { GroupMembers } from '@/components/group-members';
import { toast } from 'sonner';

export default function GroupExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('expenses');

  const { data, isLoading } = useConvexQuery(api.groups.getGroupExpenses, {
    groupId: params.id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BarLoader width={'100%'} color="#36d7b7" />
      </div>
    );
  }

  const group = data?.group;
  const members = data?.members || [];
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balances = data?.balances || [];
  const userLookupMap = data?.userLookupMap || {};

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/groups/${params.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Group link copied to clipboard!');
  };

  return (
    <div className="container mx-auto py-10 max-w-5xl animate-fadeIn">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Group Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl shadow-md">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                {group?.name}
              </h1>
              <p className="text-muted-foreground text-sm">
                {group?.description}
              </p>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {members.length} {members.length === 1 ? 'member' : 'members'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={handleShare}
              className="cursor-pointer"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button asChild variant="outline">
              <Link href={`/settlements/group/${params.id}`}>
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Settle Up
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/expenses/new?groupId=${params.id}`}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Group Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-lg border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">
              Group Balances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GroupBalances balances={balances} />
          </CardContent>
        </Card>

        <Card className="shadow-lg border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Members</CardTitle>
          </CardHeader>
          <CardContent>
            <GroupMembers members={members} />
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
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
    </div>
  );
}
