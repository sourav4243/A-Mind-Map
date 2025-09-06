"use client";

import React from 'react';
import Link from 'next/link'
import mindmapHero from '@/public/image.png'
import {Button} from '@/components/ui/button'
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
        <div className="flex items-center space-x-4">
            <Unauthenticated>
              <SignInButton mode='modal'>
                <Button variant={"ghost"}>
                  Log in
                </Button>
              </SignInButton>
            </Unauthenticated>
            <Authenticated>
              <UserButton/>
            </Authenticated>
          <Button variant='outline' className='cursor-pointer'>
            Try Now
          </Button>
          <Link href="/dashboard" >
            <Button className="font-medium bg-[#7c3bec] hover:bg-violet-700 cursor-pointer">
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
                <Button className="font-medium bg-[#7c3bec] hover:bg-violet-700 cursor-pointer" size="lg">
                  Go to Dashboard
                </Button>
              </Link>
              <Button variant='outline' className="font-medium cursor-pointer" size="lg">
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


