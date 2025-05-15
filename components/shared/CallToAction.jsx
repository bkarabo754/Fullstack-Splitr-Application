import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl gradient-title dark:gradient-title">
          Ready to simplify expense sharing?
        </h2>
        <p className="mx-auto max-w-[600px] text-zinc-600 dark:text-zinc-300 md:text-xl/relaxed">
          Join thousands of users who have made splitting expenses stress‑free.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-green-700 hover:bg-green-800 text-white hover:opacity-90"
        >
          <Link href="/dashboard">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
