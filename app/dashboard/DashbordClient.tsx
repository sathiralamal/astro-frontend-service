"use client";

import BirthForm from "@/components/brithform/BirthForm";
import Viewer from "@/components/viewer/viewer";
import React from "react";

export default function DashboardClient({ session }: { session: any }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">
        Welcome, {session?.user?.name || "User"} 👋
      </h1>
      <div className="mt-6">
        <BirthForm />
        <Viewer />
      </div>
    </div>
  );
}
