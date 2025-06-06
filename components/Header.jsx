'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import useStoreUser from '@/hooks/use-store-user';
import { BarLoader } from 'react-spinners';
import { Authenticated, Unauthenticated } from 'convex/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures client-only content only renders after hydration
  }, []);

  if (!mounted) return null; // Avoid rendering on server

  return (
    <header className="fixed top-0 w-full border-b bg-white dark:bg-zinc-950 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={'/logos/logo.png'}
            alt="Vehiql Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {path === '/' && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              How It Works
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Authenticated>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="md:hidden w-10 h-10 p-0 cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                  userButtonPopoverCard: 'shadow-xl',
                  userPreviewMainIdentifier: 'font-semibold',
                },
              }}
              afterSignOutUrl="/"
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button
                variant="ghost"
                className="bg-zinc-100 text-black hover:bg-zinc-200 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800 border cursor-pointer"
              >
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button className="bg-green-600 hover:bg-green-700 border-none cursor-pointer text-white">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
          <ThemeToggle />
        </div>
      </nav>
      {isLoading && <BarLoader width={'100%'} color="#36d7b7" />}
    </header>
  );
}
