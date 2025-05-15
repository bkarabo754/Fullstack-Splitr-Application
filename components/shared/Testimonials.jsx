import { TESTIMONIALS } from '@/lib/landing';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Testimonials = () => {
  return (
    <section className="bg-gray-50 dark:bg-black py-20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Badge
          variant="outline"
          className="text-green-700 border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
        >
          Testimonials
        </Badge>
        <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
          What our users are saying
        </h2>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role, image }) => (
            <Card
              key={name}
              className="flex flex-col justify-between dark:bg-zinc-950"
            >
              <CardContent className="space-y-4 p-6">
                <p className="text-gray-500 dark:text-gray-300">{quote}</p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={image} alt={name} />
                    <AvatarFallback className="uppercase">
                      {name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      {role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
