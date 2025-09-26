import searchIcon from "@ui/assets/icons/search.svg"

type Props = { value: string; onChange: (v: string) => void; placeholder?: string }

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div >
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 h-11">
        <img src={searchIcon} alt="Search" />
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || "Search conversations..."}
          className="h-10 w-full bg-transparent text-[15px] outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  )
}
