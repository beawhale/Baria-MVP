import * as React from "react"

export function Avatar({ name, src, size = 36 }: { name?: string; src?: string; size?: number }) {
  const initials = (name || "?")
    .split(" ")
    .map(s => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("")
  const cls = "rounded-full object-cover"
  if (src) return <img src={src} alt="" style={{ width: size, height: size }} className={cls} />
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full grid place-items-center border bg-slate-50 text-xs text-slate-700"
    >
      {initials || "?"}
    </div>
  )
}
