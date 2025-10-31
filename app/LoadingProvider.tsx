"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import Spinner from "@/components/ui/Spinner";

type LoadingContextType = {
  isLoading: boolean;
  start: () => void;
  stop: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // use a counter so overlapping requests work correctly
  const [counter, setCounter] = useState(0);

  const start = useCallback(() => setCounter((c) => c + 1), []);
  const stop = useCallback(() => setCounter((c) => Math.max(0, c - 1)), []);

  const isLoading = counter > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, start, stop }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Spinner />
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
  return ctx;
}
