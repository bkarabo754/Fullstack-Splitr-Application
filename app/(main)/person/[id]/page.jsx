'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { BarLoader } from 'react-spinners';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, ArrowLeftRight, ArrowLeft } from 'lucide-react';
import { SettlementList } from '@/app/(main)/settlements/[type]/[id]/settlement-components/settlement-list';
import { ExpenseList } from '@/components/expense-list';

export default function PersonExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('expenses');

  const { data, isLoading } = useConvexQuery(
    api.expenses.getExpensesBetweenUsers,
    { userId: params.id }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BarLoader width={'100%'} color="#36d7b7" />
      </div>
    );
  }

  const otherUser = data?.otherUser;
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balance = data?.balance || 0;

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="text-sm flex items-center gap-2 hover:text-primary cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary">
            <AvatarImage src={otherUser?.imageUrl} />
            <AvatarFallback>{otherUser?.name?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-black dark:from-white dark:to-white">
              {otherUser?.name}
            </h1>

            <p className="text-muted-foreground text-sm">{otherUser?.email}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/settlements/user/${params.id}`}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Settle up
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/expenses/new`}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </Link>
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="mb-8 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            Balance
            {balance === 0 ? (
              <Badge
                variant="outline"
                className="bg-muted text-muted-foreground"
              >
                Settled
              </Badge>
            ) : balance > 0 ? (
              <Badge className="bg-green-100 text-green-800">
                You are owed
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800">You owe</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="text-muted-foreground">
            {balance === 0 ? (
              <p>You are all settled up 🎉</p>
            ) : balance > 0 ? (
              <p>
                <span className="font-medium">{otherUser?.name}</span> owes you
              </p>
            ) : (
              <p>
                You owe <span className="font-medium">{otherUser?.name}</span>
              </p>
            )}
          </div>
          <div
            className={`text-3xl font-bold tracking-tight ${
              balance > 0
                ? 'text-green-600'
                : balance < 0
                  ? 'text-red-600'
                  : 'text-gray-600'
            }`}
          >
            R{Math.abs(balance).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        defaultValue="expenses"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="flex w-full bg-muted p-1 rounded-lg shadow-inner space-x-2">
          <TabsTrigger
            value="expenses"
            className="flex-1 flex items-center justify-center space-x-2 text-md font-medium py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-accent hover:text-primary data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary"
          >
            <span>Expenses</span>
            <Badge className="text-xs">{expenses.length}</Badge>
          </TabsTrigger>

          <TabsTrigger
            value="settlements"
            className="flex-1 flex items-center justify-center space-x-2 text-md font-medium py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-accent hover:text-primary data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary"
          >
            <span>Settlements</span>
            <Badge className="text-xs">{settlements.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          <ExpenseList
            expenses={expenses}
            showOtherPerson={false}
            otherPersonId={params.id}
            userLookupMap={{ [otherUser.id]: otherUser }}
          />
        </TabsContent>

        <TabsContent value="settlements" className="space-y-4">
          <SettlementList
            settlements={settlements}
            userLookupMap={{ [otherUser.id]: otherUser }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
