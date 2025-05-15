import { GroupMembers } from '@/components/group-members';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GroupMembersCard = ({ members }) => {
  return (
    <Card className="shadow-lg border-muted">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Members</CardTitle>
      </CardHeader>
      <CardContent>
        <GroupMembers members={members} />
      </CardContent>
    </Card>
  );
};

export default GroupMembersCard;
