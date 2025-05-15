import BalanceListItem from './BalanceListItem';

export default function BalanceList({ title, icon, balances, amountClass }) {
  return (
    <div>
      <h3 className="text-sm font-medium flex items-center mb-3">
        {icon.component}
        {title}
      </h3>
      <div className="space-y-3">
        {balances.map((item) => (
          <BalanceListItem
            key={item.userId}
            userId={item.userId}
            name={item.name}
            imageUrl={item.imageUrl}
            delta={item.delta}
            amount={item.amount}
            amountClass={amountClass}
          />
        ))}
      </div>
    </div>
  );
}
