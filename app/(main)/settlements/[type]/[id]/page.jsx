'use client';

import { useParams, useRouter } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { BarLoader } from 'react-spinners';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Banknote } from 'lucide-react';
import SettlementForm from './components/settlement-form';

export default function SettlementPage() {
  const params = useParams();
  const router = useRouter();
  const { type, id } = params;

  const { data, isLoading } = useConvexQuery(
    api.settlements.getSettlementData,
    {
      entityType: type,
      entityId: id,
    }
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-24 flex items-center justify-center">
        <BarLoader width={'100%'} color="#36d7b7" />
      </div>
    );
  }

  const handleSuccess = () => {
    if (type === 'user') {
      router.push(`/person/${id}`);
    } else if (type === 'group') {
      router.push(`/groups/${id}`);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl animate-fade-in">
      {/* Back Button */}
      <Button
        variant="outline"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-emerald-400 to-green-600 text-transparent bg-clip-text">
          Record a Settlement
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {type === 'user'
            ? `Settle up with ${data?.counterpart?.name}`
            : `Settle up in group "${data?.group?.name}"`}
        </p>
      </div>

      {/* Settlement Card */}
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {type === 'user' ? (
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={data?.counterpart?.imageUrl} />
                  <AvatarFallback>
                    {data?.counterpart?.name?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="bg-primary/10 p-2 rounded-md">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              )}
              <div>
                <CardTitle className="text-lg">
                  {type === 'user'
                    ? data?.counterpart?.name
                    : data?.group?.name}
                </CardTitle>
                {data?.amountOwed !== undefined && (
                  <p className="text-muted-foreground text-sm">
                    Owes {formatCurrency(data.amountOwed)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                {type === 'user' ? 'Individual' : 'Group'}
              </Badge>
              <Badge className="text-xs flex items-center gap-1">
                <Banknote className="h-3 w-3" />
                ZAR
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
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
