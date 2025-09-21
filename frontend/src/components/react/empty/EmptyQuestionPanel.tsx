import { motion } from "motion/react";
import { TbMessageFilled } from "react-icons/tb";

export const EmptyQuestionPanel = () => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="p-8 text-center border-t border-gray-100 bg-gray-50/30"
		>
			<div className="size-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
				<span className="text-gray-400 text-3xl">
					<TbMessageFilled />
				</span>
			</div>
			<p className="text-gray-600 font-medium mb-2 font-body">
				Las preguntas aceptadas aparecerán en la sala de presentación
			</p>
			<p className="text-sm text-gray-500 font-body">
				Usa los botones de acción para moderar el contenido
			</p>
		</motion.div>
	);
};
