'use client';

import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ExpenseForm } from './components/expense-form';

export default function NewExpensePage() {
  const router = useRouter();

  return (
    <motion.div
      className="container max-w-3xl mx-auto py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-center items-center gap-2 mb-5">
          <Badge
            variant="outline"
            className="text-sm px-3 py-1 border-green-300 bg-green-100 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
          >
            Finance ✦ Simplified
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-black via-black to-black bg-clip-text text-transparent dark:from-white dark:via-white dark:to-white">
          Add a New Expense
        </h1>
        <p className="text-muted-foreground text-md mt-2">
          Record and split expenses effortlessly with friends or teams.
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card className="shadow-xl border border-muted bg-white dark:bg-background/50 backdrop-blur-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-muted-foreground">
              Select Expense Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="individual" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-muted/30 dark:bg-muted/40 rounded-md shadow-inner">
                <TabsTrigger
                  value="individual"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary cursor-pointer"
                >
                  Individual
                </TabsTrigger>
                <TabsTrigger
                  value="group"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary cursor-pointer"
                >
                  Group
                </TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="mt-0">
                <ExpenseForm
                  type="individual"
                  onSuccess={(id) => router.push(`/person/${id}`)}
                />
              </TabsContent>

              <TabsContent value="group" className="mt-0">
                <ExpenseForm
                  type="group"
                  onSuccess={(id) => router.push(`/groups/${id}`)}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
