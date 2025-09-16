import {
	IoMdCheckmarkCircleOutline,
	IoMdCloseCircleOutline,
} from "react-icons/io";
import { TbMessageFilled } from "react-icons/tb";
import { usePanel } from "../../../hooks/usePanel";
import { Loader } from "dialca-ui";
import { AnimatePresence, motion } from "motion/react";
import { PanelStats } from "./PanelStats";
import { ModerableQuestion } from "./ModerableQuestion";
import "dialca-ui/styles";
import { EmptyQuestionPanel } from "../empty/EmptyQuestionPanel";

export const ModeratorPanel = () => {
	const {
		formEnabled,
		toggleFormStatus,
		stats,
		questions,
		updateQuestionState,
		isLoading,
	} = usePanel();
	return (
		<>
			<header className="mb-10">
				<div className="flex flex-col lg:flex-row! lg:items-center! lg:justify-between! gap-8">
					<div className="space-y-2">
						<h1 className="text-3xl lg:text-4xl! font-bold bg-gradient-to-r from-gray-900 to-primary font-titles bg-clip-text text-transparent">
							Panel de Moderación
						</h1>
						<p className="text-gray-600 text-lg font-body">
							Administra las preguntas de la conferencia en tiempo
							real
						</p>
					</div>
					<div className="flex flex-col sm:flex-row! items-start sm:items-center! gap-4">
						<button
							onClick={toggleFormStatus}
							className={`cursor-pointer transition-all hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
							active:border-b-[2px] active:brightness-90 active:translate-y-[2px] flex items-center justify-center gap-3 md:gap-2! shadow-lg 
							${
								formEnabled
									? "bg-red-400 border-red-700"
									: "bg-primary border-secondary"
							} text-white w-full md:w-auto! px-6 py-6 rounded-lg
							border-b-[4px] `}
						>
							<div
								className={`size-6 md:size-3! ${
									!formEnabled
										? "bg-green-400"
										: "bg-yellow-200"
								} rounded-full shadow-lg animate-pulse`}
							></div>
							<span className="font-semibold md:text-sm! text-lg">
								{!formEnabled ? "Habilitar" : "Deshabilitar"}{" "}
								formulario
							</span>
							<span className="text-white/80 text-2xl md:text-xl!">
								{!formEnabled ? (
									<IoMdCheckmarkCircleOutline />
								) : (
									<IoMdCloseCircleOutline />
								)}
							</span>
						</button>
					</div>
				</div>
			</header>

			<div className="grid grid-cols-1 xl:grid-cols-4! gap-8">
				{/* Sidebar con estadísticas */}
				<PanelStats {...stats} />

				{/* Lista de preguntas */}
				<section className="xl:col-span-3!">
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
						<header className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
							<div className="flex flex-col sm:flex-row! sm:items-center! sm:justify-between! gap-4">
								<h2 className="text-xl font-semibold text-gray-900">
									Preguntas Pendientes
								</h2>
								<div className="flex items-center gap-2 text-sm text-gray-500">
									<div className="size-2 bg-green-400 rounded-full animate-pulse"></div>
									<span>Actualizándose en tiempo real</span>
								</div>
							</div>
						</header>
						{isLoading ? (
							<div className="p-8 text-center">
								<div className="mx-auto">
									<Loader size="lg" />
									<p className="text-gray-500 mt-4">
										Cargando preguntas...
									</p>
								</div>
							</div>
						) : questions.length > 0 ? (
							<div className="divide-y divide-gray-100">
								<AnimatePresence mode="popLayout">
									{questions.map((question, index) => (
										<ModerableQuestion
											key={question._id}
											question={question}
											index={index}
											onUpdate={updateQuestionState}
										/>
									))}
								</AnimatePresence>
							</div>
						) : (
							<EmptyQuestionPanel />
						)}
					</div>
				</section>
			</div>
		</>
	);
};
