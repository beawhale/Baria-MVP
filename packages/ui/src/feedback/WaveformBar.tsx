import { motion } from "framer-motion"

export function WaveformBar({ h, i }: { h: number; i: number }) {
  return (
    <motion.div
      className="w-1 rounded bg-slate-500"
      style={{ height: h }}
      animate={{ scaleY: [1, 0.6, 1] }}
      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.05 }}
    />
  )
}
