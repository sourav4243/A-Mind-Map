"use client";

import React from 'react';
import Link from 'next/link'
import mindmapHero from '@/public/image.png'
import Button from '@/components/Button';
import Image from 'next/image';

import { Authenticated, Unauthenticated } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-8">
          <Link href="/" className="">
            <Image src="/logo.png" width={195} height={150} alt="The Flow Mind Logo"/>
          </Link>
          
        </div>
        <div className="flex items-center space-x-4">ī
            <Unauthenticated>
              <SignInButton>
                <Button textColor='text-gray-500' hoverTextColor='text-gray-500' bgColor='bg-white' hoverBgColor='hover:bg-gray-100' borderColor='border-none'>Log in
                </Button>
              </SignInButton>
            </Unauthenticated>
            <Authenticated>
              <UserButton/>
            </Authenticated>
          <Button variant='outline' textColor='text-gray-500' hoverTextColor='text-gray-500' bgColor='bg-white' hoverBgColor='hover:bg-gray-100' borderColor='border-gray-200' borderWidth='border-[0.5px]'>
            Try Now
          </Button>
          <Link href="/dashboard">
            <Button size='md' bgColor='bg-[#7c3bec]' hoverBgColor='hover:bg-violet-700' className="font-medium">
              Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Collaborative 
                <br />
                <span className="text-primary">mind mapping</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Quickest, easiest way for teams to capture, organize, and map ideas. 
                Transform complex thoughts into clear visual connections.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button bgColor='bg-[#7c3bec]' hoverBgColor='hover:bg-violet-700' className="font-medium">
                  Go to Dashboard
                </Button>
              </Link>
              <Button variant='outline' bgColor='bg-white' textColor='text-black' borderColor='border-black' hoverBgColor='hover:bg-black' className="font-medium">
                Try Now!
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image 
                src={mindmapHero} 
                alt="Mind mapping interface showing connected nodes and ideas" 
                className="w-full max-w-lg rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


