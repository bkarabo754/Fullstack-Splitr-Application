import ExpenseCard from './ExpenseCard';
import ExpenseChart from './ExpenseChart';
import PrintButton from './PrintButton';

export function ExpenseSummary({ monthlySpending, totalSpent }) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const currentTotal = monthlySpending?.[currentMonth]?.total || 0;
  const previousTotal = monthlySpending?.[currentMonth - 1]?.total || 0;

  const delta = currentTotal - previousTotal;
  const deltaPercentage =
    previousTotal > 0 ? ((delta / previousTotal) * 100).toFixed(1) : 0;

  const isIncrease = delta > 0;

  const chartData =
    monthlySpending?.map((item) => {
      const date = new Date(item.month);
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
      return {
        name: monthNames[date.getMonth()],
        amount: item.total,
      };
    }) || [];

  return (
    <div className="bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-xl border-0 rounded-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4">
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white">
          📊 Expense Summary
        </h2>
        <PrintButton />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <ExpenseCard
            title="Total This Month"
            value={currentTotal}
            delta={delta}
            deltaPercentage={deltaPercentage}
            isIncrease={isIncrease}
            gradientFrom="emerald-100"
            gradientTo="emerald-200"
            textColor="emerald"
          />
          <ExpenseCard
            title="Total This Year"
            value={totalSpent || 0}
            gradientFrom="indigo-100"
            gradientTo="indigo-200"
            textColor="indigo"
          />
        </div>

        <ExpenseChart data={chartData} />
        <p className="text-sm text-center text-muted-foreground mt-4">
          Monthly spending breakdown for {currentYear}
        </p>
      </div>
    </div>
  );
}
