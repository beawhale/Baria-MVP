import * as React from "react"
export function Badge({ children, className = "", ...p }: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span {...p} className={`inline-flex items-center rounded-full border border-brand/40 text-brand px-2 h-6 text-[11px] ${className}`}>
            {children}
        </span>
    )
}
