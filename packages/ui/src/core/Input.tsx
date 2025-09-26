import * as React from "react"

export function Input({ className = "", ...p }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...p}
      className={`h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-[15px] placeholder:text-slate-400 outline-none ${className}`}
    />
  )
}
