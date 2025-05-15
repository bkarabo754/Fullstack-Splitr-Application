import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export default function GroupHeader({ group, members }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-xl shadow-md">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            {group?.name}
          </h1>
          <p className="text-muted-foreground text-sm">{group?.description}</p>
          <div className="mt-1">
            <Badge variant="outline" className="text-xs">
              {members.length} {members.length === 1 ? 'member' : 'members'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
