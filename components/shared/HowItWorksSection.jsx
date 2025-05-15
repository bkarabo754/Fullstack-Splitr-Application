import { STEPS } from '@/lib/landing';
import { Badge } from '../ui/badge';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Badge
          variant="outline"
          className="text-green-700 border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
        >
          How It Works
        </Badge>
        <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
          Splitting expenses has never been easier
        </h2>
        <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-300">
          Follow these simple steps to start tracking and splitting expenses
          with friends.
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {STEPS.map(({ label, title, description }) => (
            <div key={label} className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-xl font-bold text-green-600 dark:text-green-300">
                {label}
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-gray-500 text-center dark:text-gray-300">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
