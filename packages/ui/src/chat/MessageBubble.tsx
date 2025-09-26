import React, { useEffect, useRef, useState } from "react"
import pdfIcon from "../assets/icons/picture_as_pdf.svg"
import downloadIcon from "../assets/icons/download.svg"
import playIcon from "../assets/icons/play.svg"
import testAudio from "../assets/icons/audio-test.mp3"

type Props = {
  text?: string
  time?: string
  mine?: boolean
  avatar?: string
  image?: string
  file?: { name: string; size: string }
  audio?: { duration: string; src?: string }
}

export default function MessageBubble({ text, time, mine, avatar, image, file, audio }: Props) {
  const bg = mine ? "bg-blue-600 text-white" : "bg-white text-slate-900 border border-slate-200"
  const ava = avatar || "https://i.pravatar.cc/48?img=5"

  return (
    <div className={`flex items-end gap-2 px-3 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && <img src={ava} alt="" className="h-8 w-8 rounded-full object-cover" />}

      <div className={`max-w-[70%] rounded-2xl shadow-sm px-3 py-2 text-[15px] leading-5 ${bg}`}>
        {image && (
          <div className="overflow-hidden rounded-xl">
            <img src={image} alt="" className="block w-full h-auto" />
          </div>
        )}

        {file && (
          <div className={`flex items-center gap-3 rounded-xl p-3 ${mine ? "bg-white/10" : "bg-slate-50"}`}>
            <img src={pdfIcon} alt="" />
            <div className="min-w-0">
              <p className="truncate text-sm">{file.name}</p>
              <p className="text-xs opacity-70">{file.size}</p>
            </div>
            <button className="ml-auto rounded-full p-1.5 outline-none focus:outline-none">
              <img src={downloadIcon} alt="" />
            </button>
          </div>
        )}

        {audio && <AudioBubble mine={!!mine} durationLabel={audio.duration} src={audio.src ?? testAudio} />}

        {text && <p className={`${image || file || audio ? "mt-2" : ""}`}>{text}</p>}

        {time && (
          <div className={`mt-1 text-right text-[11px] ${mine ? "text-white/80" : "text-slate-500"}`}>{time}</div>
        )}
      </div>
    </div>
  )
}

function AudioBubble({ src, durationLabel, mine }: { src: string; durationLabel: string; mine: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [bars, setBars] = useState<number[] | null>(null)

  useEffect(() => {
    let cancelled = false
    async function decode() {
      try {
        const res = await fetch(src)
        const buf = await res.arrayBuffer()
        const AC = (window as any).AudioContext || (window as any).webkitAudioContext
        const ctx = new AC()
        const audioBuf: AudioBuffer = await ctx.decodeAudioData(buf)
        const N = 50
        const data = audioBuf.getChannelData(0)
        const samplesPerBar = Math.max(1, Math.floor(data.length / N))
        const vals: number[] = []
        for (let i = 0; i < N; i++) {
          const s = i * samplesPerBar
          const e = Math.min(data.length, s + samplesPerBar)
          let sum = 0
          for (let j = s; j < e; j++) sum += data[j] * data[j]
          const rms = Math.sqrt(sum / Math.max(1, e - s))
          vals.push(rms)
        }
        const m = Math.max(...vals, 1)
        const norm = vals.map(v => Math.min(1, v / m))
        if (!cancelled) setBars(norm)
        ctx.close()
      } catch {
        if (!cancelled) setBars(Array(50).fill(0.5))
      }
    }
    decode()
    return () => {
      cancelled = true
    }
  }, [src])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => el.duration && setProgress(el.currentTime / el.duration)
    const onEnd = () => setPlaying(false)
    el.addEventListener("timeupdate", onTime)
    el.addEventListener("ended", onEnd)
    return () => {
      el.removeEventListener("timeupdate", onTime)
      el.removeEventListener("ended", onEnd)
    }
  }, [])

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    playing ? (el.pause(), setPlaying(false)) : el.play().then(() => setPlaying(true)).catch(() => {})
  }

  const blue = "#0151A3"
  const gray = mine ? "rgba(255,255,255,0.4)" : "#D1D5DB"

  return (
    <div className="flex items-center gap-3">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="rounded-full p-2 outline-none focus:outline-none">
        <img src={playIcon} alt="" />
      </button>
      <div className="relative flex-1">
        {bars && <WaveSVG bars={bars} progress={progress} fg={blue} bg={gray} />}
      </div>
      <span className={`text-xs tabular-nums ${mine ? "text-white/80" : "text-slate-600"}`}>{durationLabel}</span>
    </div>
  )
}

function WaveSVG({ bars, progress, fg, bg }: { bars: number[]; progress: number; fg: string; bg: string }) {
  const N = bars.length
  const barW = 2
  const gap = 2
  const totalW = N * (barW + gap) - gap
  const H = 20
  const cutoff = Math.floor(progress * N + 0.0001)

  return (
    <svg viewBox={`0 0 ${totalW} ${H}`} width="100%" height="auto" preserveAspectRatio="none">
      {bars.map((v, i) => {
        const h = 4 + v * 16
        const x = i * (barW + gap)
        const y = (H - h) / 2
        return <rect key={`bg-${i}`} x={x} y={y} width={barW} height={h} rx={1} fill={bg} />
      })}
      {bars.slice(0, cutoff).map((v, i) => {
        const h = 4 + v * 16
        const x = i * (barW + gap)
        const y = (H - h) / 2
        return <rect key={`fg-${i}`} x={x} y={y} width={barW} height={h} rx={1} fill={fg} />
      })}
    </svg>
  )
}
