import { FaXmark } from "react-icons/fa6";
import { IoAddSharp, IoCheckmarkOutline } from "react-icons/io5";

interface Props {
    nuevas: number,
    aceptadas: number,
    rechazadas: number
}

export const PanelStats = ({ nuevas = 0, aceptadas = 0, rechazadas = 0 }: Props) => {
	return (
		<aside className="xl:col-span-1 space-y-6">
			<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
				<h2 className="text-lg font-semibold text-gray-900 mb-6">
					Estadísticas
				</h2>

				<div className="space-y-4">
					<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-blue-600 font-medium">
									Nuevas
								</p>
								<p className="text-2xl font-bold text-blue-900">
									{nuevas}
								</p>
							</div>
							<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
								<span className="text-blue-600 text-2xl">
									<IoAddSharp />
								</span>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-green-600 font-medium">
									Aceptadas
								</p>
								<p className="text-2xl font-bold text-green-900">
									{aceptadas}
								</p>
							</div>
							<div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
								<span className="text-green-600 text-2xl">
									<IoCheckmarkOutline />
								</span>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-red-600 font-medium">
									Rechazadas
								</p>
								<p className="text-2xl font-bold text-red-900">
									{rechazadas}
								</p>
							</div>
							<div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
								<span className="text-red-600 text-2xl">
									<FaXmark />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
};
