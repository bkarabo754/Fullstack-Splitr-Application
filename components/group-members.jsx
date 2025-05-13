'use client';

import { useConvexQuery } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock online status for demonstration
const getOnlineStatus = () => Math.random() > 0.5;

export function GroupMembers({ members }) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground italic">
        No members in this group yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {members.map((member) => {
        const isCurrentUser = member.id === currentUser?._id;
        const isAdmin = member.role === 'admin';
        const isModerator = member.role === 'moderator';
        const isOnline = getOnlineStatus(); // Simulated online status

        return (
          <div
            key={member.id}
            className="flex items-center justify-between px-4 py-3 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-muted"
          >
            <div className="flex items-center gap-4 relative">
              {/* Online Indicator */}
              <div className="absolute -top-1 -left-1 z-10">
                <span
                  className={cn(
                    'h-3 w-3 rounded-full border-2 border-white dark:border-muted absolute',
                    isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  )}
                />
              </div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={member.imageUrl || undefined} />
                <AvatarFallback className="bg-primary text-white">
                  {member.name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold leading-none">
                    {isCurrentUser ? 'You' : member.name}
                  </span>

                  {isCurrentUser && (
                    <Badge
                      variant="outline"
                      className="border-blue-500 text-blue-600 bg-blue-100 hover:bg-blue-200 text-xs px-2 py-0.5 rounded-md"
                    >
                      You
                    </Badge>
                  )}

                  {isAdmin && (
                    <Badge className="bg-gradient-to-r border-red-400 from-red-500 to-red-500 text-white text-xs px-2 py-0.5 rounded-md shadow-md">
                      Admin
                    </Badge>
                  )}

                  {isModerator && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs px-2 py-0.5 rounded-md shadow-sm">
                      Moderator
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  @
                  {member.username ||
                    member.name?.toLowerCase().replace(/\s+/g, '')}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
