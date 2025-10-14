"use client";

import { Tangerine } from "next/font/google";
import { createContext, useContext } from "react";

const tangerine = Tangerine({ weight: ["400", "700"], subsets: ["latin"] });

interface WeddingContextType {
  tangerineFont: string;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

const WeddingProvider = ({ children }: { children: React.ReactNode }) => {
  return <WeddingContext.Provider value={{ tangerineFont: tangerine.className }}>{children}</WeddingContext.Provider>;
};

export function useWeddingContext() {
  const context = useContext(WeddingContext);
  if (!context) throw new Error("useTheme must be used within a WeddingProvider");
  return context;
}

export default WeddingProvider;
