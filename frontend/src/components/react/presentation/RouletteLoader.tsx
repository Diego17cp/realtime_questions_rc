import { motion } from "motion/react"

export const RouletteLoader = () => {
    return (
        <div className="relative size-40">
            {/* Ruleta principal con easing realista */}
            <motion.div 
                className="w-full h-full rounded-full relative"
                style={{
                    background: `conic-gradient(
                        #2e8acb 0deg 30deg,
                        #002f59 30deg 60deg,
                        #0dc1f2 60deg 90deg,
                        #2e8acb 90deg 120deg,
                        #002f59 120deg 150deg,
                        #0dc1f2 150deg 180deg,
                        #2e8acb 180deg 210deg,
                        #002f59 210deg 240deg,
                        #0dc1f2 240deg 270deg,
                        #2e8acb 270deg 300deg,
                        #002f59 300deg 330deg,
                        #0dc1f2 330deg 360deg
                    )`
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity
                }}
            >
                {/* Separadores con micro-animaciones */}
                <motion.div 
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(
                            transparent 28deg 30deg,
                            white 30deg 32deg,
                            transparent 32deg 58deg,
                            white 58deg 60deg,
                            transparent 60deg 88deg,
                            white 88deg 90deg,
                            transparent 90deg 118deg,
                            white 118deg 120deg,
                            transparent 120deg 148deg,
                            white 148deg 150deg,
                            transparent 150deg 178deg,
                            white 178deg 180deg,
                            transparent 180deg 208deg,
                            white 208deg 210deg,
                            transparent 210deg 238deg,
                            white 238deg 240deg,
                            transparent 240deg 268deg,
                            white 268deg 270deg,
                            transparent 270deg 298deg,
                            white 298deg 300deg,
                            transparent 300deg 328deg,
                            white 328deg 330deg,
                            transparent 330deg 360deg
                        )`
                    }}
                    animate={{ 
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            {/* Centro con pulsación suave */}
            <motion.div 
                className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-4 border-secondary flex items-center justify-center"
                animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                        "0 0 0px rgba(46, 138, 203, 0.3)",
                        "0 0 20px rgba(46, 138, 203, 0.6)",
                        "0 0 0px rgba(46, 138, 203, 0.3)"
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <motion.div 
                    className="size-4 bg-primary rounded-full"
                    animate={{ 
                        scale: [1, 0.8, 1],
                        backgroundColor: ["#2e8acb", "#0dc1f2", "#2e8acb"]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            {/* Indicador que vibra sutilmente */}
            <motion.div 
                className="absolute top-2 left-1/2 -translate-x-1/2 size-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-white drop-shadow-lg"
                animate={{ 
                    y: [0, -2, 0],
                    filter: [
                        "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
                        "drop-shadow(0 6px 8px rgba(0, 0, 0, 0.4))",
                        "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))"
                    ]
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Bola con movimiento orbital realista */}
            <motion.div 
                className="absolute top-1 left-1/2 size-3 bg-white rounded-full shadow-lg"
                style={{
                    originX: "6px",
                    originY: "72px"
                }}
                animate={{ 
                    rotate: -360,
                    scale: [1, 1.2, 1],
                    boxShadow: [
                        "0 2px 4px rgba(0, 0, 0, 0.3)",
                        "0 4px 8px rgba(13, 193, 242, 0.5)",
                        "0 2px 4px rgba(0, 0, 0, 0.3)"
                    ]
                }}
                transition={{
                    rotate: {
                        duration: 1.5,
                        ease: "linear",
                        repeat: Infinity
                    },
                    scale: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    boxShadow: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            />

            {/* Efectos de brillo dinámicos */}
            <motion.div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                    background: "conic-gradient(from 0deg, transparent 0deg 180deg, rgba(255, 255, 255, 0.1) 180deg 200deg, transparent 200deg 360deg)"
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 6,
                    ease: "linear",
                    repeat: Infinity
                }}
            />

            {/* Partículas de luz */}
            <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
                animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.02, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            {/* Sombra exterior con pulsación */}
            <motion.div 
                className="absolute -inset-2 rounded-full blur-sm -z-10"
                style={{
                    background: "radial-gradient(circle, rgba(46, 138, 203, 0.3) 0%, transparent 70%)"
                }}
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Anillos de energía */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-primary/20 -z-10"
                    style={{
                        top: `${-10 - (i * 8)}px`,
                        left: `${-10 - (i * 8)}px`,
                        right: `${-10 - (i * 8)}px`,
                        bottom: `${-10 - (i * 8)}px`,
                    }}
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    )
}