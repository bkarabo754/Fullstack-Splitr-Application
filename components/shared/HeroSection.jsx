import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';

const HeroSection = () => {
  return (
    <section className="mt-20 pb-12 space-y-10 md:space-y-20 px-5">
      <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
        <Badge
          variant="outline"
          className="text-green-700 border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300"
        >
          Split expenses. Simplify life.
        </Badge>

        <h1 className="gradient-title mx-auto max-w-6xl text-4xl font-bold md:text-8xl">
          The smartest way to split expenses with friends
        </h1>

        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-300">
          Track shared expenses, split bills effortlessly, and settle up
          quickly. Never worry about who owes who again.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row justify-center">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/dashboard">
              <span className="text-white">Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-300 dark:hover:bg-green-900"
          >
            <Link href="#how-it-works">See How It Works</Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl">
        <div className="gradient p-1 aspect-[16/9]">
          <Image
            src="/hero.png"
            width={1280}
            height={720}
            alt="Banner"
            className="rounded-lg mx-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
