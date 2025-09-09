import { motion } from "framer-motion"
export function WaveformBar({ h, i }: { h: number; i: number }) {
    return (
        <motion.div className="w-1 rounded bg-gray-500" style={{ height: h }}
            animate={{ scaleY: [1, 0.6, 1] }} transition={{ duration: .9, repeat: Infinity, delay: i * .05 }} />
    )
}
