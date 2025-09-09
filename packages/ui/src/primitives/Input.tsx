import * as React from "react"

type Props = React.InputHTMLAttributes<HTMLInputElement>

export function Input(p: Props) {
    return (
        <input
            {...p}
            className={`
        h-10 px-3 rounded-xl outline-none
        border border-border
        bg-panel text-text placeholder-text-dim
        focus:ring-1 focus:ring-brand/60
        ${p.className || ""}
      `}
        />
    )
}
