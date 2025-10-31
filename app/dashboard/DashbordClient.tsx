"use client";

import BirthForm from "@/components/brithform/BirthForm";
import Viewer from "@/components/viewer/viewer";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { signOut } from "next-auth/react";
import { astroStore } from "@/lib/astro-store";

export default function DashboardClient({ session }: { session: any }) {
  const predictions = astroStore((state) => state.predictions);

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <div className="p-6 bg-gradient-to-b from-background via-background to-muted">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Welcome, {session?.user?.name || "User"} 👋
        </h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <BirthForm />
        {predictions.length > 0 && <Viewer predictions={predictions} />}
      </div>
    </div>
  );
}
