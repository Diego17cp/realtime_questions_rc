import { motion } from "motion/react";
import { getRandomBadgeColor, getTimeAgo } from "../../../helpers";
import type { Question } from "../../../hooks/usePanel";
import { PiSealCheckLight } from "react-icons/pi";
import { RouletteLoader } from "./RouletteLoader";
import { useEffect, useState } from "react";

interface Props {
	selectedQuestion: Question | null;
	onClose: () => void;
	isLoading: boolean;
}

export const QuestionModal = ({
	selectedQuestion,
	onClose,
	isLoading,
}: Props) => {
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {
        if (isLoading || selectedQuestion) {
            setCountdown(5);
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [isLoading, selectedQuestion]);
    const showLoader = countdown > 0;
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.7, opacity: 0, y: 50 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.7, opacity: 0, y: 50 }}
				transition={{
					type: "spring",
					damping: 20,
					stiffness: 300,
				}}
				className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] flex flex-col"
				onClick={(e: React.MouseEvent<HTMLDivElement>) =>
					e.stopPropagation()
				}
			>
				{showLoader ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex flex-col items-center justify-center py-12"
					>
						<div className="mb-8">
							<RouletteLoader />
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="text-center"
						>
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
								<motion.div
									className="size-3 bg-primary rounded-full"
									animate={{ scale: [1, 1.2, 1] }}
									transition={{
										duration: 1,
										repeat: Infinity,
									}}
								/>
								<span className="text-primary font-bold text-sm font-titles">
									SELECCIONANDO PREGUNTA
								</span>
							</div>
						</motion.div>
					</motion.div>
				) : selectedQuestion ? (
					<>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="text-center mb-6 flex-shrink-0"
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
							>
								<div className="size-3 bg-primary rounded-full animate-pulse"></div>
								<span className="text-primary font-bold text-sm font-titles">
									PREGUNTA SELECCIONADA
								</span>
							</motion.div>

							<motion.span
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.2 }}
								className={`inline-flex font-body ml-3 items-center px-3 py-1.5 rounded-full text-sm font-medium ${getRandomBadgeColor()}`}
							>
								{selectedQuestion.eje.nombre}
							</motion.span>
						</motion.div>

						{/* Contenido scrolleable */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
							className="text-center mb-8 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" // ✅ Hacer scrolleable
						>
							<div className="px-2">
								{" "}
								<h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4 font-body">
									{selectedQuestion.texto}
								</h2>
								<p className="text-gray-600 font-medium">
									Recibida{" "}
									{getTimeAgo(selectedQuestion.createdAt)}
								</p>
							</div>
						</motion.div>

						{/* Footer fijo */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="flex gap-4 justify-end flex-shrink-0"
						>
							<motion.button
								onClick={onClose}
								className="cursor-pointer transition-all hover:brightness-110 hover:-translate-y-[1px] 
                                    hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] flex
                                    items-center justify-center gap-3 md:gap-2! shadow-lg text-white px-5 py-4 rounded-lg
                                    bg-primary border-secondary border-b-[4px] disabled:opacity-50 disabled:cursor-not-allowed font-body"
							>
								<PiSealCheckLight size={25} />
								<span className="text-xl">Cerrar</span>
							</motion.button>
						</motion.div>
					</>
				) : null}
			</motion.div>
		</motion.div>
	);
};
