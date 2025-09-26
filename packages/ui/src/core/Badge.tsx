import * as React from "react"

export function Badge({ children, className = "", ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...p}
      className={`inline-flex items-center rounded-full border px-2 h-6 text-[11px] leading-5 bg-slate-100 border-slate-200 text-slate-700 ${className}`}
    >
      {children}
    </span>
  )
}
