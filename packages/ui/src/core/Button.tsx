import * as React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md"
}

export function Button({ className = "", variant = "primary", size = "md", ...p }: Props) {
  const base = "inline-flex items-center justify-center rounded-full border select-none shadow-sm gap-2"
  const v =
    variant === "secondary" ? "bg-white text-slate-900 border-slate-200" :
    variant === "ghost" ? "bg-transparent border-transparent hover:bg-slate-50" :
    "bg-blue-600 text-white border-blue-600"
  const s = size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4"
  return <button className={`${base} ${v} ${s} ${className}`} {...p} />
}
