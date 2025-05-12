import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FEATURES, STEPS, TESTIMONIALS } from '@/lib/landing';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col pt-16 dark:bg-zin-950 dark:text-white">
      {/* Hero Section */}
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
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
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

      <Separator />

      {/* Features Section */}
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
            Our platform provides all the tools you need to handle shared
            expenses with ease.
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
                <p className="text-gray-500 dark:text-gray-300">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* How It Works */}
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

      <Separator />

      {/* Testimonials */}
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

      <Separator />

      {/* Call to Action */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl gradient-title dark:gradient-title">
            Ready to simplify expense sharing?
          </h2>
          <p className="mx-auto max-w-[600px] text-zinc-600 dark:text-zinc-300 md:text-xl/relaxed">
            Join thousands of users who have made splitting expenses
            stress‑free.
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

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-black py-12 text-center text-sm text-muted-foreground dark:text-gray-400">
        © {new Date().getFullYear()} Splitr. All rights reserved.
      </footer>
    </div>
  );
}
