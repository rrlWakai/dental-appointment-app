import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur-xl shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
