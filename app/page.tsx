"use client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="items-center space-x-2 flex">
              <span className="font-bold inline-block">Your App</span>
            </Link>
          </div>
          <nav>
            <Link href="/login">
              <Button variant="ghost" className="mr-2">
                Sign In
              </Button>
            </Link>
            <Link href="/onClick={function onClick} ">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to Your App
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A secure and responsive authentication system with Next.js and
              NextAuth.js
            </p>
            <div className="space-x-4">
              <Link href="/login">
                <Button size="lg" className="mr-2">
                  Get Started
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
