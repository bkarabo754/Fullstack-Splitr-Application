import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

export default function ExpenseCard({
  title,
  value,
  delta,
  deltaPercentage,
  isIncrease,
  gradientFrom,
  gradientTo,
  textColor,
}) {
  return (
    <div
      className={`bg-gradient-to-tr from-${gradientFrom} to-${gradientTo} dark:from-${gradientFrom.replace(
        '100',
        '900'
      )} dark:to-${gradientTo.replace('200', '800')} rounded-xl p-5 shadow-sm`}
    >
      <p
        className={`text-sm font-medium text-${textColor}-800 dark:text-${textColor}-200`}
      >
        {title}
      </p>
      <div className="flex items-baseline gap-2 mt-1">
        <h3
          className={`text-3xl font-semibold text-${textColor}-900 dark:text-${textColor}-100`}
        >
          R{value.toFixed(2)}
        </h3>
        {delta !== undefined && delta !== 0 && (
          <span
            className={`flex items-center text-sm font-medium ${
              isIncrease
                ? `text-green-600 dark:text-green-400`
                : `text-red-600 dark:text-red-400`
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
  );
}
