'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import GroupHeader from '../GroupHeader';
import GroupActions from '../GroupActions';
import GroupBalancesCard from '../GroupBalancesCard';
import GroupMembersCard from '../GroupMembersCard';
import GroupTabs from '../GroupTabs';

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
        <LoadingIndicator />
      </div>
    );
  }

  const { group, members, expenses, settlements, balances, userLookupMap } =
    data || {};

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

        {/* Group Header, Group Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <GroupHeader group={group} members={members} router={router} />
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <GroupActions groupId={params.id} onBack={() => router.back()} />
          </div>
        </div>
      </div>

      {/* Group Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <GroupBalancesCard balances={balances} />
        <GroupMembersCard members={members} />
      </div>

      {/* Tabs Section */}
      <GroupTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        expenses={expenses}
        settlements={settlements}
        userLookupMap={userLookupMap}
      />
    </div>
  );
}
