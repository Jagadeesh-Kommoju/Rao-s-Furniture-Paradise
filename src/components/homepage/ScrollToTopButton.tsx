"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className="fixed bottom-20 right-4 z-30 flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-beige bg-white text-[10px] font-bold uppercase tracking-wide text-walnut shadow-md hover:border-terracotta hover:text-terracotta transition-colors"
    >
      <ArrowUp className="h-4 w-4 mb-0.5" />
      <span>Top</span>
    </button>
  );
}
