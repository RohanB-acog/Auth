"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Search, Bell, Grid, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        {/* Menu Button */}
        <Button variant="ghost" size="icon" className="shrink-0">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png"
            alt="Aganitha Logo"
            width={180}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Home Button */}
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Home className="h-5 w-5" />
          </Button>
        </Link>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <div className="flex items-center">
            <select className="h-10 rounded-l-md border border-r-0 bg-transparent px-3 text-sm outline-none">
              <option>Choose one</option>
            </select>
            <div className="flex h-10 items-center rounded-r-md border bg-transparent">
              <Search className="ml-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for results..."
                className="h-full border-0 bg-transparent px-3 text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Icons */}
      {/* <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Grid className="h-5 w-5" />
        </Button>
      </div> */}
    </div>
  );
}