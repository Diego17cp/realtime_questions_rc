import { Toaster } from "sonner";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import { GrSend } from "react-icons/gr";
import { Loader } from "dialca-ui";
import { motion } from "motion/react";

export const Form = () => {
	const {
		formData,
		handleTextChange,
		handleEjeChange,
		ejes,
		fetchEjes,
		isSubmitting,
		handleSubmit,
	} = useForm();
	useEffect(() => {
		fetchEjes();
	}, []);
	return (
		<motion.section
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			className="md:col-span-2 bg-white rounded-2xl shadow-xl p-4 md:p-6"
		>
			<form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<label
						htmlFor="eje"
						className="block text-sm font-semibold text-gray-700 mb-2"
					>
						Selecciona el Eje:
					</label>
					<select
						id="eje"
						value={formData.eje.id}
						className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/60 focus:outline-none cursor-pointer transition-all duration-300 hover:border-gray-300 text-sm"
						onChange={(e) =>
							handleEjeChange({
								id: e.target.value,
								nombre: e.target.options[e.target.selectedIndex]
									.text,
							})
						}
						required
					>
						<option value="">Elige una opción...</option>
						{ejes.map((eje) => (
							<option key={eje.id} value={eje.id}>
								{eje.nombre}
							</option>
						))}
					</select>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<label
						htmlFor="pregunta"
						className="block text-sm font-semibold text-gray-700 mb-2"
					>
						Escribe tu pregunta:
					</label>
					<textarea
						id="pregunta"
						value={formData.texto}
						onChange={handleTextChange}
						maxLength={500}
						rows={5}
						placeholder="¿Cuál es tu pregunta sobre la gestión municipal?"
						className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none resize-none focus:border-secondary focus:ring-4 focus:ring-secondary/60 transition-all duration-300 hover:border-gray-300 text-sm"
						required
					></textarea>
					<div className="mt-2 text-xs text-gray-500">
						<span
							className={`${
								formData.texto.length > 500 * 0.9
									? "text-red-500"
									: formData.texto.length > 500 * 0.7
									? "text-yellow-500"
									: ""
							}`}
						>
							{formData.texto.length}
						</span>
						/500 caracteres
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<button
						type="submit"
						disabled={isSubmitting}
						className="group w-full cursor-pointer relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"></div>
						<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"></div>
						<div className="relative z-10 flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white group-hover:scale-105 group-active:scale-95 transition-transform duration-200">
							{isSubmitting ? (
								<Loader
									size={6}
									classes={{
										outerRing: "border-t-white/70!",
										innerRing: "border-t-white!",
									}}
								/>
							) : (
								<>
									<span>Enviar Pregunta</span>
									<GrSend size={20} />
								</>
							)}
						</div>
					</button>
				</motion.div>
			</form>

			<Toaster richColors closeButton />
		</motion.section>
	);
};
