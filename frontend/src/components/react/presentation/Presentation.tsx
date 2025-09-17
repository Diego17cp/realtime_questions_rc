import { LuRefreshCcw } from "react-icons/lu";
import { usePresentation } from "../../../hooks/usePresentation";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { AcceptedQuestion } from "./AcceptedQuestion";
import { AnsweredQuestion } from "./AnsweredQuestion";
import { EmptyAcceptedsPresentation } from "../empty/EmptyAcceptedsPresentation";
import { EmptyAnsweredsPresentation } from "../empty/EmptyAnsweredsPresentation";
import { QuestionModal } from "./QuestionModal";

export const PresentationView = () => {
	const {
		acceptedQuestions,
		answeredQuestions,
		isLoading,
		isSelectingRandom,
		selectRandomQuestion,
		setSelectedQuestion,
		selectedQuestion,
	} = usePresentation();

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (selectedQuestion && !showModal) setShowModal(true);
	}, [selectedQuestion, showModal]);

	const handleRandomSelection = () => {
		selectRandomQuestion();
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedQuestion(null);
	};

	if (isLoading) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="flex justify-center items-center min-h-96"
			>
				<div className="text-center">
					<div className="size-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-white/70">Cargando preguntas...</p>
				</div>
			</motion.div>
		);
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="grid grid-cols-1 xl:grid-cols-9 gap-8"
			>
				<section className="xl:col-span-6 space-y-8">
					{/* Lista de preguntas aprobadas */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, delay: 0.2 }}
						className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
					>
						<div className="px-6 py-4 border-b border-white/20 bg-white/5">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
								<h2 className="text-xl font-semibold text-white">
									Preguntas Aprobadas
								</h2>
								<div className="flex items-center gap-2 text-sm text-white/70">
									<motion.div
										animate={{ scale: [1, 1.2, 1] }}
										transition={{
											duration: 2,
											repeat: Infinity,
										}}
										className="size-2 bg-green-400 rounded-full"
									/>
									<span>
										{acceptedQuestions.length} preguntas
										disponibles
									</span>
								</div>
							</div>
						</div>

						<div className="divide-y divide-white/10 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
							<AnimatePresence mode="popLayout">
								{acceptedQuestions.map((question, index) => (
									<AcceptedQuestion
										key={question._id}
										question={question}
										index={index}
									/>
								))}
							</AnimatePresence>

							{acceptedQuestions.length === 0 && (
								<EmptyAcceptedsPresentation />
							)}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
					>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							<button
								onClick={handleRandomSelection}
								disabled={ isSelectingRandom || acceptedQuestions.length === 0 }
								className={`cursor-pointer transition-all hover:brightness-110 hover:-translate-y-[1px] 
                                hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] flex
                                items-center justify-center gap-3 md:gap-2! shadow-lg text-white w-auto px-6 py-6 rounded-lg
                                bg-primary border-secondary border-b-[4px] disabled:opacity-50 disabled:cursor-not-allowed`}
							>
								<motion.span
									animate={
										isSelectingRandom
											? { rotate: 360 }
											: { rotate: [0, 180] }
									}
									transition={
										isSelectingRandom
											? {
													duration: 1,
													repeat: Infinity,
													ease: "linear",
											}
											: {
													duration: 0.5,
													repeatType: "reverse",
											}
									}
									className="text-2xl"
								>
									<LuRefreshCcw />
								</motion.span>
								<span className="text-lg">
									{isSelectingRandom
										? "Seleccionando..."
										: "Nueva Pregunta Aleatoria"}
								</span>
							</button>
						</div>
					</motion.div>
				</section>

				{/* Sidebar - Preguntas respondidas */}
				<motion.aside
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.7, delay: 0.3 }}
					className="xl:col-span-3 space-y-6"
				>
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className="flex items-center justify-between mb-6"
						>
							<h3 className="text-xl font-semibold text-white">
								Preguntas Respondidas
							</h3>
							<motion.div
								animate={{ scale: [1, 1.1, 1] }}
								transition={{ duration: 2, repeat: Infinity }}
								className="size-8 bg-green-500/20 rounded-full flex items-center justify-center"
							>
								<span className="text-green-400 font-bold text-sm">
									{answeredQuestions.length}
								</span>
							</motion.div>
						</motion.div>

						<div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
							<AnimatePresence>
								{answeredQuestions.length > 0 ? (
									answeredQuestions.map((question, index) => (
										<AnsweredQuestion
											key={question._id}
											question={question}
											index={index}
										/>
									))
								) : (
									<EmptyAnsweredsPresentation />
								)}
							</AnimatePresence>
						</div>
					</div>
				</motion.aside>
			</motion.div>

			{/* Modal para pregunta seleccionada */}
			<AnimatePresence>
				{showModal && selectedQuestion && (
					<QuestionModal
						selectedQuestion={selectedQuestion}
						onClose={handleCloseModal}
					/>
				)}
			</AnimatePresence>
		</>
	);
};
