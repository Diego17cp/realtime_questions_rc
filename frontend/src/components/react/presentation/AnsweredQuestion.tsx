import { motion } from "motion/react";
import { getRandomBadgeColor, getTimeAgo } from "../../../helpers";
import type { Question } from "../../../hooks/usePanel";
import { PiSealCheckLight } from "react-icons/pi";

interface Props {
    question: Question;
    index: number;
}

export const AnsweredQuestion = ({ question, index } : Props) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.8, y: -20 }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			className="bg-green-500/10 border border-green-400/20 rounded-xl p-4"
		>
			<div className="space-y-3">
				<div className="flex items-center justify-between">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRandomBadgeColor()}`}
                        title={question.eje?.nombre}
                    >
                        <span className="inline-block max-w-[9rem] truncate">
                            {question.eje?.nombre ?? ""}
                        </span>
                    </motion.span>
					<motion.span
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }} 
						transition={{ delay: index * 0.1 + 0.3 }}
						className="text-green-400 text-xs font-medium"
					>
						{getTimeAgo(question.createdAt)}
					</motion.span>
				</div>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: index * 0.1 + 0.4 }}
					className="text-white/90 text-sm leading-relaxed"
				>
					{question.texto}
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 + 0.5 }}
					className="flex items-center gap-2 text-green-400"
				>
					<motion.span
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: index * 0.1 + 0.6 }}
						className="text-2xl"
					>
						<PiSealCheckLight />
					</motion.span>
					<span className="text-sm font-medium">Respondida</span>
				</motion.div>
			</div>
		</motion.div>
	);
};
