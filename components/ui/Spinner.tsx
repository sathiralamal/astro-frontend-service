"use client";

import React from "react";

export default function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center"
    >
      <div className="animate-spin h-12 w-12 rounded-full border-4 border-t-transparent border-white/90" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
