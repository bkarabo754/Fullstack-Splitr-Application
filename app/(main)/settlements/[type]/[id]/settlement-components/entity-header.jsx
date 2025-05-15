import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export default function EntityHeader({ type, entityData }) {
  const isUser = type === 'user';

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {isUser ? (
          <Avatar className="h-12 w-12 ring ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage src={entityData.imageUrl} />
            <AvatarFallback>{entityData.name?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="bg-primary/10 p-3 rounded-xl">
            <Users className="h-6 w-6 text-primary" />
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold leading-tight">
            {entityData.name}
          </h2>
          <p className="text-muted-foreground text-sm">
            {isUser ? 'One-on-One Settlement' : 'Group-wide Balance'}
          </p>
        </div>
      </div>

      <Badge
        variant="outline"
        className="text-[10px] uppercase font-semibold tracking-widest text-primary border-primary"
      >
        {isUser ? 'User' : 'Group'}
      </Badge>
    </div>
  );
}
