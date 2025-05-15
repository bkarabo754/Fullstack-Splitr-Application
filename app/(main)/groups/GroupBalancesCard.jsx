import { GroupBalances } from '@/components/group-balances';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GroupBalancesCard = ({ balances }) => {
  return (
    <Card className="lg:col-span-2 shadow-lg border-muted">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Group Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <GroupBalances balances={balances} />
      </CardContent>
    </Card>
  );
};

export default GroupBalancesCard;
