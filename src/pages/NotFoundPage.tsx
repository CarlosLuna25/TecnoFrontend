import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NotFoundPage({ dashboard }: { dashboard: boolean }) {
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleGoBack = () => {
		navigate("/dashboard");
	};

	const handleGoHome = () => {
		navigate("/");
	};

	return dashboard ? (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center px-4">
			<div className="max-w-lg w-full text-center">
				{/* Ilustración 404 */}
				<div className="mb-8">
					<div className="relative">
						<h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-4">
							404
						</h1>
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="w-32 h-32 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full animate-pulse border border-teal-400/30"></div>
						</div>
					</div>
				</div>

				{/* Mensaje principal */}
				<div className="mb-8">
					<h2 className="text-3xl font-bold text-black mb-4">
						¡Oops! Página no encontrada
					</h2>
					<p className="text-slate-500 text-lg leading-relaxed">
						La página que estás buscando no existe o ha sido movida. No te
						preocupes, te ayudamos a encontrar el camino de vuelta.
					</p>
				</div>

				{/* Iconos decorativos */}
				<div className="flex justify-center space-x-4 mb-8">
					<div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce"></div>
					<div
						className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce"
						style={{ animationDelay: "0.1s" }}
					></div>
					<div
						className="w-3 h-3 bg-teal-400 rounded-full animate-bounce"
						style={{ animationDelay: "0.2s" }}
					></div>
				</div>

				{/* Botones de acción */}
				<div className="space-y-4">
					{user ? (
						<>
							<button
								onClick={handleGoBack}
								className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out"
							>
								<span className="flex items-center justify-center">
									<svg
										className="w-5 h-5 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 19l-7-7m0 0l7-7m-7 7h18"
										/>
									</svg>
									Volver al Dashboard
								</span>
							</button>
							<button
								onClick={handleGoHome}
								className="w-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white font-semibold py-4 px-8 rounded-xl border-2 border-slate-700/50 hover:border-teal-400/30 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out"
							>
								Ir al Inicio
							</button>
						</>
					) : (
						<button
							onClick={handleGoHome}
							className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out"
						>
							<span className="flex items-center justify-center">
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
								Ir al Inicio
							</span>
						</button>
					)}
				</div>

				{/* Mensaje adicional */}
				<div className="mt-8">
					<p className="text-sm text-slate-500">
						¿Necesitas ayuda? Contacta con nuestro equipo de soporte
					</p>
				</div>
			</div>
		</div>
	) : (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
			<h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-4">
				404
			</h1>
		</div>
	);
}
