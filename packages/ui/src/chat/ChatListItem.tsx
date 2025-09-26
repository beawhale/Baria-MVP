import { Link } from "react-router-dom"
import { Badge } from "../core/Badge"

type Props = {
  id: string
  name: string
  preview: string
  time: string
  unread?: number
  badges?: string[]
  avatar?: string
  isFirst?: boolean
}

export default function ChatListItem({
  id,
  name,
  preview,
  time,
  unread = 0,
  badges = [],
  avatar,
  isFirst,
}: Props) {
  return (
    <div className="px-4">
      {isFirst && <div className="border-t border-[#92929233]" />}

      <Link
        to={`/chat/${id}`}
        className="grid grid-cols-[auto,1fr] items-center gap-x-3 py-3 hover:bg-slate-50"
      >
        <img
          src={avatar || "https://i.pravatar.cc/48"}
          alt=""
          className="h-11 w-11 rounded-full object-cover"
        />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-medium text-slate-900">{name}</p>
            <div className="flex gap-1">
              {badges.map((b, i) => (
                <Badge key={i} className="px-1.5 text-[10px] h-5">
                  {b}
                </Badge>
              ))}
            </div>
            <span className="ml-auto shrink-0 text-xs text-slate-500">{time}</span>
          </div>
          <div className="mt-0.5 flex items-start gap-2">
            <p className="truncate text-sm text-slate-600 flex-1">{preview}</p>
            {unread > 0 && (
              <span className="ml-2 grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1 text-[11px] font-semibold text-white">
                {unread}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="border-t border-[#92929233]" />
    </div>
  )
}
