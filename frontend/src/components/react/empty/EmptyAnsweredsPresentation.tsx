import { motion } from "motion/react";
import { AiOutlineMessage } from "react-icons/ai";

export const EmptyAnsweredsPresentation = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="text-center py-8"
		>
			<motion.div
				animate={{ y: [0, -5, 0] }}
				transition={{
					duration: 2,
					repeat: Infinity,
				}}
				className="size-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
			>
				<span className="text-4xl text-white/50">
					<AiOutlineMessage />
				</span>
			</motion.div>
			<p className="text-white/60 font-medium mb-2 font-body">
				No hay preguntas respondidas
			</p>
			<p className="text-white/40 text-sm font-body">
				Las preguntas aparecerán aquí una vez respondidas
			</p>
		</motion.div>
	);
};
