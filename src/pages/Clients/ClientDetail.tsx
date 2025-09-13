import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Client } from "../../types/client";
import type { Transaction } from "../../types/Transactions";
import { getClientById } from "../../services/clientService";
import { ClickableImage } from "../../components/ImageModal";

export default function ClientDetail() {
	const { id } = useParams();
	const [client, setClient] = useState<Client | null>(null);
	const navigate = useNavigate();

	// Datos dummy de transacciones
	const [transactions] = useState<Transaction[]>([
		{
			id: 1,
			descripcion: "Pago inicial del proyecto",
			monto: 5000,
			tipo: "ingreso",
			fecha: "2025-01-15",
			categoria: "Pagos de clientes",
			metodo_pago: "Transferencia bancaria",
			cliente_id: parseInt(id || "0"),
			created_at: "2025-01-15T10:30:00Z",
		},
		{
			id: 2,
			descripcion: "Compra de materiales para proyecto",
			monto: 1200,
			tipo: "gasto",
			fecha: "2025-01-10",
			categoria: "Materiales",
			metodo_pago: "Tarjeta de crédito",
			cliente_id: parseInt(id || "0"),
			created_at: "2025-01-10T14:20:00Z",
		},
		{
			id: 3,
			descripcion: "Segundo pago del proyecto",
			monto: 3500,
			tipo: "ingreso",
			fecha: "2025-01-05",
			categoria: "Pagos de clientes",
			metodo_pago: "Efectivo",
			cliente_id: parseInt(id || "0"),
			created_at: "2025-01-05T16:45:00Z",
		},
		{
			id: 4,
			descripcion: "Gastos de transporte",
			monto: 150,
			tipo: "gasto",
			fecha: "2025-01-03",
			categoria: "Transporte",
			metodo_pago: "Efectivo",
			cliente_id: parseInt(id || "0"),
			created_at: "2025-01-03T09:15:00Z",
		},
		{
			id: 5,
			descripcion: "Pago final del proyecto",
			monto: 4500,
			tipo: "ingreso",
			fecha: "2024-12-28",
			categoria: "Pagos de clientes",
			metodo_pago: "Transferencia bancaria",
			cliente_id: parseInt(id || "0"),
			created_at: "2024-12-28T11:30:00Z",
		},
	]);

	useEffect(() => {
		const loadClient = async () => {
			const clientData = await getClientById(id || "");
			if (clientData) {
				setClient(clientData);
			} else {
				navigate("/dashboard/clients");
			}
		};
		loadClient();
	}, [id, navigate]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "sin_iniciar":
				return "bg-gray-100 text-gray-800";
			case "pausado":
				return "bg-yellow-100 text-yellow-800";
			case "en_progreso":
				return "bg-green-100 text-green-800";
			case "finalizado":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case "sin_iniciar":
				return "Sin Iniciar";
			case "pausado":
				return "Pausado";
			case "en_progreso":
				return "En Progreso";
			case "finalizado":
				return "Finalizado";
			default:
				return status;
		}
	};

	const getTypeLabel = (type: string) => {
		return type === "empresa" ? "Empresa" : "Persona";
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("es-ES", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const totalIngresos = transactions
		.filter((t) => t.tipo === "ingreso")
		.reduce((sum, t) => sum + t.monto, 0);

	const totalGastos = transactions
		.filter((t) => t.tipo === "gasto")
		.reduce((sum, t) => sum + t.monto, 0);

	const balanceTotal = totalIngresos - totalGastos;

	if (!client) {
		return (
			<div className="flex items-center justify-center min-h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">{client.nombre}</h1>
					<p className="text-gray-600 mt-2">
						Información detallada del cliente
					</p>
				</div>
				<div className="flex items-center space-x-3">
					<button
						onClick={() => navigate(`/dashboard/clients/${client.id}`)}
						className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
					>
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
								d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
							/>
						</svg>
						<span>Editar</span>
					</button>
					<button
						onClick={() => navigate("/dashboard/clients")}
						className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg hover:border-gray-400"
					>
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
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<span>Volver</span>
					</button>
				</div>
			</div>

			{/* Tarjetas de información del cliente */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Información principal */}
				<div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-start space-x-6">
						{/* Imagen del cliente */}
						<div className="flex-shrink-0">
							{client.imagen_url ? (
								<ClickableImage
									src={client.imagen_url}
									alt={client.nombre}
									className="w-24 h-24 rounded-xl border-2 border-gray-200 overflow-hidden"
								>
									<img
										src={client.imagen_url}
										alt={client.nombre}
										className="w-full h-full object-cover"
									/>
								</ClickableImage>
							) : (
								<div className="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center">
									<svg
										className="w-12 h-12 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
							)}
						</div>

						{/* Información básica */}
						<div className="flex-1 space-y-4">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 mb-2">
									{client.nombre}
								</h2>
								<div className="flex items-center space-x-4">
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}
									>
										{getTypeLabel(client.tipo)}
									</span>
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
											client.estado
										)}`}
									>
										{getStatusLabel(client.estado)}
									</span>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h3 className="text-sm font-medium text-gray-500">
										Dirección
									</h3>
									<p className="text-gray-900">{client.direccion}</p>
								</div>
								<div>
									<h3 className="text-sm font-medium text-gray-500">
										Ubicación
									</h3>
									<p className="text-gray-900">
										{client.estados.nombre}, {client.municipios.nombre}
									</p>
								</div>
								<div>
									<h3 className="text-sm font-medium text-gray-500">
										Presupuesto
									</h3>
									<p className="text-gray-900 font-semibold">
										USD {client.presupuesto.toLocaleString()}
									</p>
								</div>
								<div>
									<h3 className="text-sm font-medium text-gray-500">
										Fecha de registro
									</h3>
									<p className="text-gray-900">
										{formatDate(client.created_at)}
									</p>
								</div>
							</div>

							{client.detalles_adicionales && (
								<div>
									<h3 className="text-sm font-medium text-gray-500">
										Detalles adicionales
									</h3>
									<p className="text-gray-900">{client.detalles_adicionales}</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Resumen financiero */}
				<div className="space-y-6">
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Resumen Financiero
						</h3>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
										<svg
											className="w-4 h-4 text-green-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M7 11l5-5m0 0l5 5m-5-5v12"
											/>
										</svg>
									</div>
									<span className="text-sm font-medium text-gray-700">
										Ingresos
									</span>
								</div>
								<span className="text-lg font-bold text-green-600">
									USD {totalIngresos.toLocaleString()}
								</span>
							</div>

							<div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
										<svg
											className="w-4 h-4 text-red-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 13l-5 5m0 0l-5-5m5 5V6"
											/>
										</svg>
									</div>
									<span className="text-sm font-medium text-gray-700">
										Gastos
									</span>
								</div>
								<span className="text-lg font-bold text-red-600">
									USD {totalGastos.toLocaleString()}
								</span>
							</div>

							<div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-t border-blue-200">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
										<svg
											className="w-4 h-4 text-blue-600"
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
									<span className="text-sm font-medium text-gray-700">
										Balance
									</span>
								</div>
								<span
									className={`text-lg font-bold ${
										balanceTotal >= 0 ? "text-green-600" : "text-red-600"
									}`}
								>
									USD {balanceTotal.toLocaleString()}
								</span>
							</div>
						</div>
					</div>

					{/* Estadísticas rápidas */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Estadísticas
						</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">
									Total transacciones
								</span>
								<span className="font-semibold text-gray-900">
									{transactions.length}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">
									Última transacción
								</span>
								<span className="font-semibold text-gray-900">
									{formatDate(transactions[0]?.fecha || "")}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">
									Progreso del proyecto
								</span>
								<span className="font-semibold text-gray-900">75%</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Tabla de transacciones */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100">
				<div className="p-6 border-b border-gray-100">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-gray-900">
							Historial de Transacciones
						</h3>
						<button className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm">
							<svg
								className="w-4 h-4"
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
							<span>Nueva Transacción</span>
						</button>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Descripción
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Tipo
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Monto
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Categoría
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Método de Pago
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Fecha
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{transactions.map((transaction) => (
								<tr key={transaction.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-gray-900">
											{transaction.descripcion}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												transaction.tipo === "ingreso"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{transaction.tipo === "ingreso" ? "Ingreso" : "Gasto"}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div
											className={`text-sm font-semibold ${
												transaction.tipo === "ingreso"
													? "text-green-600"
													: "text-red-600"
											}`}
										>
											{transaction.tipo === "ingreso" ? "+" : "-"}USD{" "}
											{transaction.monto.toLocaleString()}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{transaction.categoria}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{transaction.metodo_pago}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(transaction.fecha)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{transactions.length === 0 && (
					<div className="text-center py-12">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
						<h3 className="mt-2 text-sm font-medium text-gray-900">
							No hay transacciones
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Comienza agregando tu primera transacción para este cliente.
						</p>
						<div className="mt-6">
							<button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
								Agregar Transacción
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
