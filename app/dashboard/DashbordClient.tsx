"use client";

import BirthForm from "@/components/brithform/BirthForm";
import Viewer from "@/components/viewer/viewer";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function DashboardClient({ session }: { session: any }) {
  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Welcome, {session?.user?.name || "User"} 👋
        </h1>
        <Button variant="destructive" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      <div className="mt-6">
        <BirthForm />
        <Viewer />
      </div>
    </div>
  );
}
