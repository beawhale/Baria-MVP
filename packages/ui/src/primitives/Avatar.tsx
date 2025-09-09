
import * as React from "react"
export function Avatar({ name }: { name: string }){
  const initials = name.split(" ").map(s=>s[0]?.toUpperCase()).slice(0,2).join("")
  return <div className="w-9 h-9 rounded-full grid place-items-center border bg-gray-50 text-xs">{initials||"?"}</div>
}
