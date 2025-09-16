import { FaRegQuestionCircle } from "react-icons/fa";
import { motion } from "motion/react";

export const Info = () => {
	return (
		<motion.section
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			whileHover={{ scale: 1.02 }}
			className="md:col-span-3 bg-white rounded-2xl shadow-xl p-4 md:p-8"
		>
			<div className="text-center">
				<div className="mb-4 md:mb-6">
					<motion.div
						initial={{ y: 0 }}
						animate={{ y: [0, -10, 0] }}
						transition={{
							duration: 2,
							ease: "easeInOut",
							repeat: Infinity,
						}}
						className="size-24 md:size-32! mx-auto bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center shadow-2xl"
					>
						<FaRegQuestionCircle size={52} className="text-white" />
					</motion.div>
				</div>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4! font-titles"
				>
					¡Haz tu Pregunta!
				</motion.h2>
				<motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
					className="text-gray-600 px-5 md:px-15! text-sm md:text-lg! leading-relaxed font-body">
					Participa en la rendición de cuentas municipal. Tu voz es
					importante para construir una ciudad más transparente y
					participativa.
				</motion.p>
				<div className="mt-4 md:mt-6">
					<span className="inline-flex items-center px-3 py-2 md:px-4! bg-primary/50 text-secondary rounded-full text-xs md:text-sm! font-medium font-body animate-pulse">
						En tiempo real
					</span>
				</div>
			</div>
		</motion.section>
	);
};
