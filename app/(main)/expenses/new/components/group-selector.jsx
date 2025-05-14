'use client';

import { useState, useEffect } from 'react';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';
import { Users } from 'lucide-react';
import { BarLoader } from 'react-spinners';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export function GroupSelector({ onChange }) {
  const [selectedGroupId, setSelectedGroupId] = useState('');

  const { data, isLoading } = useConvexQuery(
    api.groups.getGroupOrMembers,
    selectedGroupId ? { groupId: selectedGroupId } : {}
  );

  useEffect(() => {
    if (data?.selectedGroup && onChange) {
      onChange(data.selectedGroup);
    }
  }, [data, onChange]);

  const handleGroupChange = (groupId) => {
    setSelectedGroupId(groupId);
  };

  if (isLoading && !data?.groups) {
    return (
      <div className="flex items-center justify-center py-6">
        <BarLoader width="100%" color="#36d7b7" />
      </div>
    );
  }

  if (!data?.groups || data.groups.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl shadow-md text-sm flex items-center gap-2"
      >
        ⚠️ You need to <strong className="font-semibold">create a group</strong>{' '}
        before adding expenses.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-5"
    >
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Select a Group
        </label>
        <Select value={selectedGroupId} onValueChange={handleGroupChange}>
          <SelectTrigger className="w-full h-11 rounded-xl border-muted px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition duration-200">
            <SelectValue placeholder="Choose a group..." />
          </SelectTrigger>
          <SelectContent className="z-50">
            {data.groups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.25 }}
              >
                <SelectItem
                  value={group.id}
                  className="py-2 px-1 transition hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium truncate max-w-[140px]">
                        {group.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs rounded-md">
                      {group.memberCount} members
                    </Badge>
                  </div>
                </SelectItem>
              </motion.div>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && selectedGroupId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-1"
        >
          <BarLoader width="100%" color="#36d7b7" />
        </motion.div>
      )}
    </motion.div>
  );
}
