'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

export function ExpenseSummary({ monthlySpending, totalSpent }) {
  const printRef = useRef();

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const chartData =
    monthlySpending?.map((item) => {
      const date = new Date(item.month);
      return {
        name: monthNames[date.getMonth()],
        amount: item.total,
      };
    }) || [];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const currentTotal = monthlySpending?.[currentMonth]?.total || 0;
  const previousTotal = monthlySpending?.[currentMonth - 1]?.total || 0;

  const delta = currentTotal - previousTotal;
  const deltaPercentage =
    previousTotal > 0 ? ((delta / previousTotal) * 100).toFixed(1) : 0;

  const isIncrease = delta > 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card
      ref={printRef}
      className="bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-xl border-0 rounded-2xl"
    >
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <CardTitle className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          📊 Expense Summary
        </CardTitle>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="flex items-center gap-2 text-sm"
        >
          <FiDownload className="w-4 h-4" />
          Print Report
        </Button>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-tr from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-xl p-5 shadow-sm">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              Total This Month
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-semibold text-emerald-900 dark:text-emerald-100">
                R{currentTotal.toFixed(2)}
              </h3>
              {delta !== 0 && (
                <span
                  className={`flex items-center text-sm font-medium ${
                    isIncrease
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {isIncrease ? (
                    <FaArrowUp className="mr-1" />
                  ) : (
                    <FaArrowDown className="mr-1" />
                  )}
                  {Math.abs(deltaPercentage)}%
                </span>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-tr from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 rounded-xl p-5 shadow-sm">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              Total This Year
            </p>
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-indigo-100 mt-1">
              R{totalSpent?.toFixed(2) || '0.00'}
            </h3>
          </div>
        </div>

        <div className="h-64 w-full animate-fade-in">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}
                formatter={(value) => [`R${value.toFixed(2)}`, 'Amount']}
              />
              <Bar
                dataKey="amount"
                fill="#4ade80"
                radius={[6, 6, 0, 0]}
                isAnimationActive
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Monthly spending breakdown for {currentYear}
        </p>
      </CardContent>
    </Card>
  );
}
