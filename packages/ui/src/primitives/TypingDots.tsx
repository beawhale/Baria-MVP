import { motion } from "framer-motion"
export function TypingDots() {
    return (
        <div className="flex items-center gap-1">
            {[0, 1, 2].map(i => (
                <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400"
                    animate={{ y: [0, -3, 0] }} transition={{ duration: .8, repeat: Infinity, delay: i * .15 }} />
            ))}
        </div>
    )
}
