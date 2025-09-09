import * as React from "react"
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost", size?: "sm" | "md" }
export function Button({ className = "", variant = "primary", size = "md", ...p }: Props) {
    const base = "rounded-full border px-4 h-10 inline-flex items-center gap-2 justify-center select-none shadow-soft"
    const v =
        variant === "secondary" ? "bg-panel text-text border-border" :
            variant === "ghost" ? "bg-transparent border-transparent hover:bg-bgsoft" :
                "bg-brand text-white border-brand"
    const s = size === "sm" ? "h-8 px-3 text-sm" : ""
    return <button className={`${base} ${v} ${s} ${className}`} {...p} />
}
