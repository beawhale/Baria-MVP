import * as React from "react"
export function Card({ className = "", ...p }: React.HTMLAttributes<HTMLDivElement>) { return <div className={`rounded-2xl border border-border bg-panel shadow-soft ${className}`} {...p} /> }
export function CardHeader(p: React.HTMLAttributes<HTMLDivElement>) { return <div {...p} className={`p-4 ${p.className || ""}`} /> }
export function CardTitle(p: React.HTMLAttributes<HTMLDivElement>) { return <div {...p} className={`text-lg font-semibold text-text ${p.className || ""}`} /> }
export function CardContent(p: React.HTMLAttributes<HTMLDivElement>) { return <div {...p} className={`p-4 pt-0 grid gap-3 ${p.className || ""}`} /> }
