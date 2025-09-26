import { BottomTabs } from "@ui"

import chevronRight from "@ui/assets/icons/chevron_right.svg"
import stAccounts from "@ui/assets/icons/st_accounts.svg"
import stNotification from "@ui/assets/icons/st_notification.svg"
import stData from "@ui/assets/icons/st_data.svg"
import stHelp from "@ui/assets/icons/st_help.svg"
import stAbout from "@ui/assets/icons/st_about.svg"

const Row = ({ iconSrc, title, sub }: { iconSrc: string; title: string; sub: string }) => (
  <button className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left shadow-sm">
    <img src={iconSrc} alt=""  />
    <div className="min-w-0">
      <p className="text-[15px] font-medium text-slate-900">{title}</p>
      <p className="truncate text-sm text-slate-500">{sub}</p>
    </div>
    <img src={chevronRight} alt="" className="ml-auto opacity-60" />
  </button>
)

export default function Settings() {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-100">
      <header className="bg-white">
        <div className="mx-auto max-w-md px-4 py-4">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md space-y-3 px-4 py-3">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <img src="https://i.pravatar.cc/64" className="h-14 w-14 rounded-full" />
          <div>
            <p className="text-[15px] font-semibold">Ethan Parker</p>
            <p className="text-sm text-slate-500">+44 2356 985 065</p>
          </div>
        </div>

        <Row iconSrc={stAccounts}     title="Account"       sub="change photo, name, number" />
        <Row iconSrc={stNotification}  title="Notifications" sub="Sounds, vibration, in-app alerts" />
        <Row iconSrc={stData}          title="Data & Storage" sub="Usage, auto-download" />
        <Row iconSrc={stHelp}          title="Help"          sub="Help center, contact us, terms" />
        <Row iconSrc={stAbout}         title="About"         sub="App info, version" />

        <button className="mt-2 w-full rounded-2xl bg-red-500 py-3 text-white shadow-sm">Log Out</button>
      </main>
    </div>
  )
}
