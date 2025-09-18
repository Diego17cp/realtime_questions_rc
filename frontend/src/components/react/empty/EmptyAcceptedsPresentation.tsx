import { motion } from "motion/react";
import { BiMessageError } from "react-icons/bi";

export const EmptyAcceptedsPresentation = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="p-12 text-center"
		>
			<motion.div
				animate={{ rotate: [0, 10, -10, 0] }}
				transition={{
					duration: 2,
					repeat: Infinity,
				}}
				className="size-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
			>
				<span className="text-4xl text-white/50">
					<BiMessageError />
				</span>
			</motion.div>
			<p className="text-white/60 font-medium mb-2">
				No hay preguntas
			</p>
			<p className="text-white/40 text-sm">
				Las preguntas aparecerán aquí
			</p>
		</motion.div>
	);
};
