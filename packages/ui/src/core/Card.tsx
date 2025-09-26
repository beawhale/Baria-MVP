import * as React from "react"

export function Card({ className = "", ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...p} className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`} />
}

export function CardHeader(p: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...p} className={`p-4 ${p.className || ""}`} />
}

export function CardTitle(p: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...p} className={`text-lg font-semibold text-slate-900 ${p.className || ""}`} />
}

export function CardContent(p: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...p} className={`p-4 pt-0 grid gap-3 ${p.className || ""}`} />
}
