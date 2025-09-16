import { motion } from "motion/react";
import { CiCircleCheck } from "react-icons/ci";
import { FaXmark } from "react-icons/fa6";
import type { Question } from "../../../hooks/usePanel";
import { getRandomBadgeColor, getTimeAgo } from "../../../helpers";

interface Props {
    question: Question
    index?: number
    onUpdate(id: string, newState: "aceptada" | "rechazada"): void
}

export const ModerableQuestion = ({ question, index, onUpdate }: Props) => {
	return (
		<motion.article
			initial={{
				opacity: 0,
				y: 20,
				scale: 0.95,
			}}
			animate={{
				opacity: 1,
				y: 0,
				scale: 1,
			}}
			exit={{
				opacity: 0,
				x: -100,
				scale: 0.95,
			}}
			className="p-6 hover:bg-gray-50/50 transition-colors"
			key={question._id}
		>
			<div className="flex flex-col lg:flex-row lg:items-start gap-4">
				<div className="flex-1 space-y-3">
					<div className="flex items-start gap-3">
						<div className="flex-shrink-0 size-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
							<span className="text-sm font-bold text-primary">
								#{index! + 1}
							</span>
						</div>
						<div className="flex-1 min-w-0">
							<div className="flex flex-wrap items-center gap-2 mb-2">
								<span
									className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRandomBadgeColor()}`}
								>
									{question.eje.nombre}
								</span>
								<span className="text-xs text-gray-500">•</span>
								<span className="text-xs text-gray-500">
									{getTimeAgo(question.createdAt)}
								</span>
							</div>
							<p className="text-gray-900 font-medium leading-relaxed">
								{question.texto}
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-end md:justify-self-auto gap-3 flex-shrink-0">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => onUpdate(question._id, "rechazada")}
						className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-100 cursor-pointer"
					>
						<span className="text-xl group-hover:scale-110 transition-transform">
							<FaXmark />
						</span>
						<span className="font-medium text-sm hidden sm:block">
							Rechazar
						</span>
					</motion.button>

					{/* Botón aceptar */}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => onUpdate(question._id, "aceptada")}
						className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r cursor-pointer from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 shadow-lg hover:shadow-xl"
					>
						<span className="text-lg group-hover:scale-110 transition-transform">
							<CiCircleCheck />
						</span>
						<span className="font-medium text-sm hidden sm:block">
							Aceptar
						</span>
					</motion.button>
				</div>
			</div>
		</motion.article>
	);
};
