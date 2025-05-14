'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { UserPlus, X, Users, Search, Loader2, UserCircle2 } from 'lucide-react';

export function ParticipantSelector({ participants, onParticipantsChange }) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Search for users
  const { data: searchResults, isLoading } = useConvexQuery(
    api.users.searchUsers,
    { query: searchQuery }
  );

  // Add a participant
  const addParticipant = (user) => {
    // Check if already added
    if (participants.some((p) => p.id === user.id)) {
      return;
    }

    // Add to list
    onParticipantsChange([...participants, user]);
    setOpen(false);
    setSearchQuery('');
  };

  // Remove a participant
  const removeParticipant = (userId) => {
    // Don't allow removing yourself
    if (userId === currentUser._id) {
      return;
    }

    onParticipantsChange(participants.filter((p) => p.id !== userId));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {participants.map((participant) => (
          <Badge
            key={participant.id}
            variant="secondary"
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={participant.imageUrl} />
              <AvatarFallback>
                {participant.name?.charAt(0).toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
            <span className="truncate max-w-[150px]">
              {participant.id === currentUser?._id
                ? 'You'
                : participant.name || participant.email}
            </span>
            {participant.id !== currentUser?._id && (
              <button
                onClick={() => removeParticipant(participant.id)}
                className="text-muted-foreground hover:text-destructive transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </Badge>
        ))}

        {participants.length < 2 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 gap-2 text-sm"
              >
                <UserPlus className="w-4 h-4" />
                Add Person
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search name or email..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  icon={<Search className="w-4 h-4" />}
                />
                <CommandList>
                  <CommandEmpty>
                    {searchQuery.length < 2 ? (
                      <p className="py-4 text-center text-sm text-muted-foreground">
                        Type at least 2 characters to search
                      </p>
                    ) : isLoading ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <p className="py-4 text-center text-sm text-muted-foreground">
                        No users found
                      </p>
                    )}
                  </CommandEmpty>
                  <CommandGroup heading="Users">
                    {searchResults?.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.name + user.email}
                        onSelect={() => addParticipant(user)}
                        className="px-3 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={user.imageUrl} />
                            <AvatarFallback>
                              {user.name?.charAt(0).toUpperCase() || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {user.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
