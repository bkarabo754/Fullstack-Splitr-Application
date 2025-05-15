import { FEATURES } from '@/lib/landing';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-gray-50 dark:bg-black py-20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Badge
          variant="outline"
          className="text-green-700 border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
        >
          Features
        </Badge>
        <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
          Everything you need to split expenses
        </h2>
        <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-300">
          Our platform provides all the tools you need to handle shared expenses
          with ease.
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ title, Icon, bg, color, description }) => (
            <Card
              key={title}
              className="flex flex-col items-center space-y-4 p-6 text-center dark:bg-zinc-950"
            >
              <div className={`rounded-full p-3 ${bg}`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-gray-500 dark:text-gray-300">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
