'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { Plus, User, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import CreateGroupModal from './components/create-group-modal';
import { useRouter, useSearchParams } from 'next/navigation';

const ContactsPage = () => {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading } = useConvexQuery(api.contacts.getAllContacts);

  // Check for the createGroup parameter when the component mounts
  useEffect(() => {
    const createGroupParam = searchParams.get('createGroup');

    if (createGroupParam === 'true') {
      // Open the modal
      setIsCreateGroupModalOpen(true);

      // Remove the parameter from the URL
      const url = new URL(window.location.href);
      url.searchParams.delete('createGroup');

      // Replace the current URL without the parameter
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={'100%'} color="#36d7b7" />
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };

  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-emerald-400 text-transparent bg-clip-text">
          Contacts
        </h1>
        <Button
          onClick={() => setIsCreateGroupModalOpen(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      {/* Contact & Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* People */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-zinc-900 dark:text-zinc-100">
            <User className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
            People
          </h2>

          {users.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center text-muted-foreground text-sm">
                No contacts yet. Add an expense with someone to see them here.
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {users.map((user) => (
                <Link key={user.id} href={`/person/${user.id}`}>
                  <Card className="transition-all duration-200 hover:shadow-lg hover:bg-muted/30 border border-muted/20">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-11 w-11">
                            <AvatarImage src={user.imageUrl} />
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {user.isCurrentUser && (
                            <Badge variant="outline" className="text-xs">
                              You
                            </Badge>
                          )}
                          {user.role === 'admin' && (
                            <Badge variant="destructive" className="text-xs">
                              Admin
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Groups */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-zinc-900 dark:text-zinc-100">
            <Users className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
            Groups
          </h2>

          {groups.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center text-muted-foreground text-sm">
                No groups yet. Create a group to start tracking shared expenses.
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {groups.map((group) => (
                <Link key={group.id} href={`/groups/${group.id}`}>
                  <Card className="transition-all duration-200 hover:shadow-lg hover:bg-muted/30 border border-muted/20">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">
                              {group.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {group.memberCount} members
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {group.isNew && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                          {group.isActive && (
                            <Badge variant="default" className="text-xs">
                              Active
                            </Badge>
                          )}
                          {group.isArchived && (
                            <Badge variant="outline" className="text-xs">
                              Archived
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSuccess={(groupId) => {
          router.push(`/groups/${groupId}`);
        }}
      />
    </div>
  );
};

export default ContactsPage;
