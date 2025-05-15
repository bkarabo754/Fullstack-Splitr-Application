'use client';

import { useParams, useRouter } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SettlementForm from './settlement-components/settlement-form';
import EntityHeader from './settlement-components/entity-header';
import LoadingIndicator from '@/components/ui/LoadingIndicator';

export default function SettlementPage() {
  const params = useParams();
  const router = useRouter();
  const { type, id } = params;

  const { data, isLoading } = useConvexQuery(
    api.settlements.getSettlementData,
    { entityType: type, entityId: id }
  );

  const handleSuccess = () => {
    router.push(type === 'user' ? `/person/${id}` : `/groups/${id}`);
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="container mx-auto px-6 sm:px-8 py-10 max-w-3xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 hover:bg-muted/50 transition border cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground/80">
          Record a Settlement
        </h1>
        <p className="text-muted-foreground mt-2 text-base">
          {type === 'user'
            ? `Settle your balance with ${data?.counterpart?.name}`
            : `Finalize dues in ${data?.group?.name}`}
        </p>
      </div>

      {/* Card */}
      <Card className="border border-muted shadow-xl backdrop-blur-md bg-background/80 dark:bg-muted/40 transition-all duration-300 rounded-2xl p-6">
        <CardHeader className="pb-4">
          <EntityHeader
            type={type}
            entityData={{
              name:
                type === 'user' ? data?.counterpart?.name : data?.group?.name,
              imageUrl:
                type === 'user' ? data?.counterpart?.imageUrl : undefined,
            }}
          />
        </CardHeader>
        <CardContent className="pt-2 pb-6">
          <SettlementForm
            entityType={type}
            entityData={data}
            onSuccess={handleSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
}
