import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom"

export default function AppError() {
  const err = useRouteError()
  const isRR = isRouteErrorResponse(err)
  const status = isRR ? err.status : 500
  const title = isRR ? err.statusText || "Error" : "Unexpected Error"

  return (
    <div className="mx-auto grid min-h-dvh max-w-md place-items-center bg-white p-6">
      <div className="w-full rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{status} — {title}</h1>
        <p className="mt-2 text-slate-600">
          {status === 404 ? "We couldn’t find that page." : "Something went wrong."}
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button onClick={() => location.reload()} className="rounded-full bg-blue-600 px-4 py-2 text-white">
            Refresh
          </button>
          <Link to="/" className="rounded-full border px-4 py-2">Go Home</Link>
        </div>
      </div>
    </div>
  )
}
