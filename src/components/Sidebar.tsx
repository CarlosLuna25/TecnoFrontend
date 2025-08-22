import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../../public/logo_black.webp";

interface SidebarItem {
	name: string;
	href: string;
	icon: React.ReactNode;
}

export default function Sidebar() {
	const { signOut, userData } = useAuth();
	const location = useLocation();

	const navigation: SidebarItem[] = [
		{
			name: "Dashboard",
			href: "/dashboard",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
					/>
				</svg>
			),
		},
		{
			name: "Clientes",
			href: "/dashboard/clients",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
					/>
				</svg>
			),
		},
		{
			name: "Presupuestos",
			href: "/dashboard/budgets",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
			),
		},
		{
			name: "Gastos",
			href: "/dashboard/expenses",
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
					/>
				</svg>
			),
		},
	];

	const isActive = (href: string) => {
		if (href === "/dashboard") {
			return location.pathname === "/dashboard";
		}
		return location.pathname.startsWith(href);
	};

	return (
		<aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col min-h-screen shadow-2xl fixed top-0 left-0 max-h-screen">
			{/* Header con logo */}
			<div className="p-6 border-b border-slate-700/50">
				<div className="flex items-center space-x-3 mb-4">
					<div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center border border-teal-400/30">
						<img
							src={logo}
							alt="TecnoCarlos"
							className="w-8 h-8 object-contain filter brightness-0 invert"
						/>
					</div>
					<div>
						<h1 className="text-xl font-bold text-white">TecnoCarlos</h1>
						<p className="text-xs text-teal-300">Panel de Control</p>
					</div>
				</div>

				{/* Información del usuario */}
				<div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
							<span className="text-slate-900 font-semibold text-sm">
								{userData?.full_name?.charAt(0)?.toUpperCase() || "U"}
							</span>
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-semibold text-white truncate">
								{userData?.full_name || "Usuario"}
							</p>
							<p className="text-xs text-slate-400 truncate">
								{userData?.email || "usuario@ejemplo.com"}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Navegación */}
			<nav className="flex-1 px-4 py-6 space-y-2">
				{navigation.map((item) => {
					const active = isActive(item.href);
					return (
						<Link
							key={item.name}
							to={item.href}
							className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
								active
									? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg transform scale-105"
									: "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:scale-105"
							}`}
						>
							<div
								className={`mr-3 transition-colors duration-200 ${
									active
										? "text-white"
										: "text-slate-400 group-hover:text-teal-400"
								}`}
							>
								{item.icon}
							</div>
							{item.name}
							{active && (
								<div className="ml-auto">
									<div className="w-2 h-2 bg-white rounded-full"></div>
								</div>
							)}
						</Link>
					);
				})}
			</nav>

			{/* Footer con logout */}
			<div className="p-4 border-t border-slate-700/50">
				<button
					onClick={signOut}
					className="w-full flex items-center px-4 py-3 text-sm font-medium text-slate-300 rounded-xl hover:text-white hover:bg-red-500/20 hover:border-red-400/30 transition-all duration-200 group"
				>
					<svg
						className="w-5 h-5 mr-3 text-slate-400 group-hover:text-red-400 transition-colors duration-200"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
					Cerrar Sesión
				</button>

				{/* Info adicional */}
				<div className="mt-4 pt-4 border-t border-slate-700/50">
					<p className="text-xs text-slate-500 text-center">
						© 2025 TecnoCarlos
					</p>
				</div>
			</div>
		</aside>
	);
}
