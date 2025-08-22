import { Navigate, Outlet } from "react-router-dom";

import bgImage from "../../public/bg-tecno.webp";
import { useAuth } from "../hooks/useAuth";

export default function AuthLayout() {
	const { user } = useAuth();

	if (user) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<div className="flex items-center justify-center min-h-screen relative overflow-hidden">
			{/* Imagen de fondo con overlay */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url(${bgImage})` }}
			></div>

			{/* Overlay con gradiente de la marca */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-emerald-900/80"></div>

			{/* Elementos decorativos */}
			<div className="absolute top-20 left-20 w-32 h-32 bg-teal-400/20 rounded-full blur-xl"></div>
			<div className="absolute bottom-20 right-20 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl"></div>
			<div className="absolute top-1/2 left-10 w-24 h-24 bg-emerald-400/15 rounded-full blur-lg"></div>

			{/* Contenido principal */}
			<div className="relative z-20 w-full max-w-md px-6">
				<Outlet />
			</div>
		</div>
	);
}
