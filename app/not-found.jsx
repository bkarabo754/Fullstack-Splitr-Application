'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white dark:bg-black transition-colors duration-300">
      <Badge
        variant="outline"
        className="mb-4 text-red-700 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300"
      >
        404 — Page Not Found
      </Badge>

      <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
        Oops! This page doesn’t exist.
      </h1>

      <p className="max-w-xl text-zinc-600 dark:text-zinc-400 mb-8 text-lg">
        The page you’re looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Button asChild variant="outline" className="group text-base px-6 py-3">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Return Home
        </Link>
      </Button>

      <div className="absolute bottom-10 text-sm text-zinc-400 dark:text-zinc-600">
        © {new Date().getFullYear()} Splitr. All rights reserved.
      </div>
    </div>
  );
}
