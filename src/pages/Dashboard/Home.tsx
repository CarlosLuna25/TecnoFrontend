// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getMunicipalities, getStates } from "../../services/state";

export default function Home() {
	const stats = [
		{
			name: "Clientes Activos",
			value: "24",
			change: "+12%",
			changeType: "positive",
			icon: (
				<svg
					className="w-6 h-6"
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
			name: "Presupuestos Pendientes",
			value: "8",
			change: "+4%",
			changeType: "positive",
			icon: (
				<svg
					className="w-6 h-6"
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
			name: "Ingresos del Mes",
			value: "€12,450",
			change: "+23%",
			changeType: "positive",
			icon: (
				<svg
					className="w-6 h-6"
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
		{
			name: "Proyectos Completados",
			value: "18",
			change: "+8%",
			changeType: "positive",
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
		},
	];

	const recentActivities = [
		{
			id: 1,
			action: "Nuevo cliente registrado",
			client: "Empresa ABC S.L.",
			time: "hace 2 horas",
			type: "client",
		},
		{
			id: 2,
			action: "Presupuesto enviado",
			client: "TechSol Corp",
			time: "hace 4 horas",
			type: "budget",
		},
		{
			id: 3,
			action: "Proyecto completado",
			client: "InnovateIT",
			time: "hace 1 día",
			type: "project",
		},
		{
			id: 4,
			action: "Pago recibido",
			client: "StartupXYZ",
			time: "hace 2 días",
			type: "payment",
		},
	];

	// Datos para gráfico de dona - Análisis financiero
	// const financialData = [
	// 	{ name: "Ingresos", value: 12450, color: "#14b8a6", percentage: 65 },
	// 	{ name: "Gastos", value: 4200, color: "#ef4444", percentage: 22 },
	// 	{ name: "Por Cobrar", value: 2500, color: "#f59e0b", percentage: 13 },
	// ];
	const getStatesAndMunicipalities = async () => {
		const states = await getStates();
		const municipalities = await getMunicipalities();
		return { states, municipalities };
	};

	useEffect(() => {
		getStatesAndMunicipalities();
	}, []);

	return (
		<div className="space-y-8">
			{/* Bienvenida */}
			<div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 text-white">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta!</h1>
						<p className="text-teal-100 text-lg">
							Aquí tienes un resumen de tu negocio hoy
						</p>
					</div>
					<div className="hidden md:block">
						<div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
							<svg
								className="w-12 h-12 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
			{/* Gráfico de dona - Análisis financiero */}
			{/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full">
				<div className="p-6 border-b border-gray-100">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-gray-900">
							Análisis Financiero
						</h3>
						<div className="text-sm text-gray-500">Diciembre 2025</div>
					</div>
				</div>
				<div className="p-6">
					<div className="relative">
						<ResponsiveContainer width="100%" height={250}>
							<PieChart>
								<Pie
									data={financialData}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={100}
									paddingAngle={3}
									dataKey="value"
								>
									{financialData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
								<Tooltip
									formatter={(value: number) => [
										`€${value.toLocaleString()}`,
										"",
									]}
								/>
							</PieChart>
						</ResponsiveContainer>
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-center">
								<div className="text-2xl font-bold text-gray-900">€19.15K</div>
								<div className="text-sm text-gray-600">Total</div>
							</div>
						</div>
					</div>
					<div className="mt-6 space-y-3">
						{financialData.map((item, index) => (
							<div key={index} className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div
										className="w-3 h-3 rounded-full"
										style={{ backgroundColor: item.color }}
									></div>
									<span className="text-sm font-medium text-gray-700">
										{item.name}
									</span>
								</div>
								<div className="text-right">
									<div className="text-sm font-bold text-gray-900">
										€{item.value.toLocaleString()}
									</div>
									<div className="text-xs text-gray-500">
										{item.percentage}%
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div> */}
			{/* Estadísticas */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat) => (
					<div
						key={stat.name}
						className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="flex-shrink-0">
									<div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
										{stat.icon}
									</div>
								</div>
								<div>
									<p className="text-sm font-medium text-gray-600">
										{stat.name}
									</p>
									<p className="text-2xl font-bold text-gray-900">
										{stat.value}
									</p>
								</div>
							</div>
						</div>
						<div className="mt-4">
							<div className="flex items-center text-sm">
								<span className="text-green-600 font-medium">
									{stat.change}
								</span>
								<span className="text-gray-600 ml-1">vs mes anterior</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Contenido principal en grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Actividad reciente */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-xl shadow-sm border border-gray-100">
						<div className="p-6 border-b border-gray-100">
							<h3 className="text-lg font-semibold text-gray-900">
								Actividad Reciente
							</h3>
						</div>
						<div className="p-6">
							<div className="space-y-4">
								{recentActivities.map((activity) => (
									<div
										key={activity.id}
										className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
									>
										<div
											className={`w-10 h-10 rounded-full flex items-center justify-center ${
												activity.type === "client"
													? "bg-blue-100 text-blue-600"
													: activity.type === "budget"
													? "bg-orange-100 text-orange-600"
													: activity.type === "project"
													? "bg-green-100 text-green-600"
													: "bg-purple-100 text-purple-600"
											}`}
										>
											{activity.type === "client" && (
												<svg
													className="w-5 h-5"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
														clipRule="evenodd"
													/>
												</svg>
											)}
											{activity.type === "budget" && (
												<svg
													className="w-5 h-5"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4z"
														clipRule="evenodd"
													/>
												</svg>
											)}
											{activity.type === "project" && (
												<svg
													className="w-5 h-5"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
														clipRule="evenodd"
													/>
												</svg>
											)}
											{activity.type === "payment" && (
												<svg
													className="w-5 h-5"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
													<path
														fillRule="evenodd"
														d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
														clipRule="evenodd"
													/>
												</svg>
											)}
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium text-gray-900">
												{activity.action}
											</p>
											<p className="text-sm text-gray-600">{activity.client}</p>
										</div>
										<div className="text-xs text-gray-500">{activity.time}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Acciones rápidas */}
				<div className="space-y-6">
					<div className="bg-white rounded-xl shadow-sm border border-gray-100">
						<div className="p-6 border-b border-gray-100">
							<h3 className="text-lg font-semibold text-gray-900">
								Acciones Rápidas
							</h3>
						</div>
						<div className="p-6 space-y-3">
							<Link
								to="/dashboard/clients/new"
								className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200 group"
							>
								<div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 group-hover:bg-teal-200">
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
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
								</div>
								<span className="font-medium">Agregar Cliente</span>
							</Link>
							<button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 group">
								<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-200">
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
								</div>
								<span className="font-medium">Crear Presupuesto</span>
							</button>
							<button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 group">
								<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-200">
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
								</div>
								<span className="font-medium">Registrar Gasto</span>
							</button>
						</div>
					</div>

					{/* Estado del sistema */}
					<div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div>
								<h4 className="font-semibold">
									Todo funcionando perfectamente
								</h4>
								<p className="text-green-100 text-sm">
									Última sincronización: ahora
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
