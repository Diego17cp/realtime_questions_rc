import { motion } from "motion/react";
import { getRandomBadgeColor, getTimeAgo } from "../../../helpers";
import type { Question } from "../../../hooks/usePanel";

interface Props {
    question: Question;
    index: number;
}

export const AcceptedQuestion = ({ question, index }: Props) => {
	return (
		<motion.article
			layout
			initial={{ opacity: 0, y: -20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{
				opacity: 0,
				x: 100,
				scale: 0.9,
				transition: { duration: 0.3 },
			}}
			transition={{ duration: 0.4, ease: "easeOut" }}
			whileHover={{
				backgroundColor: "rgba(255, 255, 255, 0.08)",
				transition: { duration: 0.2 },
			}}
			className="p-6 transition-colors cursor-pointer"
		>
			<div className="flex items-start gap-4">
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: index * 0.1 + 0.3 }}
					className="flex-shrink-0 size-10 bg-primary/20 rounded-xl flex items-center justify-center"
				>
					<span className="text-tertiary font-bold text-sm">
						#{index + 1}
					</span>
				</motion.div>
				<div className="flex-1 min-w-0 space-y-2">
					<div className="flex flex-wrap items-center gap-2">
						<motion.span
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 + 0.4 }}
							className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRandomBadgeColor()}`}
						>
							{question.eje.nombre}
						</motion.span>
						<span className="text-xs text-white/50">•</span>
						<span className="text-xs text-white/50">
							{getTimeAgo(question.createdAt)}
						</span>
					</div>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: index * 0.1 + 0.5 }}
						className="text-white font-medium leading-relaxed"
					>
						{question.texto}
					</motion.p>
				</div>
			</div>
		</motion.article>
	);
};
