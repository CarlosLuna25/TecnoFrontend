import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Client } from "../../types/client";
import { deleteClient, getClients } from "../../services/clientService";
import { ClickableImage } from "../../components/ImageModal";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
export default function ClientsList() {
	const [clients, setClients] = useState<Client[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		loadClients();
	}, []);

	const handleDeleteClient = async (id: number) => {
		try {
			const result = await swal.fire({
				title: "¿Estás seguro?",
				text: "¿Estás seguro de querer eliminar este cliente?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
			});
			if (result.isConfirmed) {
				await deleteClient(id);
				const clientsData = await getClients();
				setClients(clientsData);
				swal.fire({
					title: "Cliente eliminado",
					text: "Cliente eliminado correctamente",
					icon: "success",
				});
			}
		} catch (error) {
			console.error("Error eliminando cliente:", error);
			swal.fire({
				title: "Error",
				text: "Error eliminando cliente",
				icon: "error",
			});
		}
	};

	const loadClients = async () => {
		try {
			setLoading(true);
			const clientsData = await getClients();
			setClients(clientsData);
		} catch (error) {
			console.error("Error cargando clientes:", error);
		} finally {
			setLoading(false);
		}
	};

	const filteredClients = clients.filter(
		(client) =>
			client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
			client.direccion.toLowerCase().includes(searchTerm.toLowerCase())
	);

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
			default:
				return status;
		}
	};

	const getTypeLabel = (type: string) => {
		return type === "empresa" ? "Empresa" : "Persona";
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
					<p className="text-gray-600 mt-2">
						Gestiona y administra todos tus clientes
					</p>
				</div>
				<Link
					to="/dashboard/clients/new"
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
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
					<span>Nuevo Cliente</span>
				</Link>
			</div>

			{/* Estadísticas rápidas */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Total Clientes</p>
							<p className="text-2xl font-bold text-gray-900">
								{clients.length}
							</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<svg
								className="w-6 h-6 text-blue-600"
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
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">En Progreso</p>
							<p className="text-2xl font-bold text-gray-900">
								{clients.filter((c) => c.estado === "en_progreso").length}
							</p>
						</div>
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<svg
								className="w-6 h-6 text-green-600"
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

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Empresas</p>
							<p className="text-2xl font-bold text-gray-900">
								{clients.filter((c) => c.tipo === "empresa").length}
							</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<svg
								className="w-6 h-6 text-purple-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
								/>
							</svg>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Presupuesto Total</p>
							<p className="text-2xl font-bold text-gray-900">
								$US.{" "}
								{clients
									.reduce((sum, client) => sum + client.presupuesto, 0)
									.toLocaleString()}
							</p>
						</div>
						<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
							<svg
								className="w-6 h-6 text-yellow-600"
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
					</div>
				</div>
			</div>

			{/* Filtros y búsqueda */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
				<div className="flex items-center space-x-4">
					<div className="flex-1">
						<div className="relative">
							<svg
								className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							<input
								type="text"
								placeholder="Buscar clientes..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Lista de clientes */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100">
				{filteredClients.length === 0 ? (
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
								d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
							/>
						</svg>
						<h3 className="mt-2 text-sm font-medium text-gray-900">
							No hay clientes
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							{searchTerm
								? "No se encontraron clientes que coincidan con tu búsqueda."
								: "Comienza agregando tu primer cliente."}
						</p>
						{!searchTerm && (
							<div className="mt-6">
								<Link
									to="/dashboard/clients/new"
									className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
								>
									<svg
										className="-ml-1 mr-2 h-5 w-5"
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
									Agregar Cliente
								</Link>
							</div>
						)}
					</div>
				) : (
					<div className="overflow-hidden">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Cliente
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Tipo
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Estado
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Presupuesto
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Ubicación
									</th>
									<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
										Acciones
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredClients.map((client) => (
									<tr key={client.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center space-x-3">
												{/* Imagen del cliente */}
												<div className="flex-shrink-0">
													{client.imagen_url ? (
														<ClickableImage
															src={client.imagen_url}
															alt={client.nombre}
															className="w-10 h-10 rounded-full border-2 border-gray-200 overflow-hidden"
														>
															<img
																src={client.imagen_url}
																alt={client.nombre}
																className="w-full h-full object-cover"
															/>
														</ClickableImage>
													) : (
														<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
															<svg
																className="w-6 h-6 text-gray-400"
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
												{/* Información del cliente */}
												<div>
													<div
														className="text-sm font-medium text-gray-900 cursor-pointer"
														onClick={() =>
															navigate(`/dashboard/clients/detail/${client.id}`)
														}
													>
														{client.nombre}
													</div>
													<div
														className="text-sm text-gray-500 truncate max-w-xs cursor-pointer"
														onClick={() =>
															navigate(`/dashboard/clients/detail/${client.id}`)
														}
													>
														{client.direccion}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
												{getTypeLabel(client.tipo)}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
													client.estado
												)}`}
											>
												{getStatusLabel(client.estado)}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											USD {client.presupuesto.toLocaleString()}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{client.estados.nombre}, {client.municipios.nombre}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex items-center justify-end space-x-2">
												<button
													className="text-teal-600 hover:text-teal-900 transition-colors"
													onClick={() =>
														navigate(`/dashboard/clients/${client.id}`)
													}
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
												</button>
												<button
													className="text-red-600 hover:text-red-900 transition-colors"
													onClick={() => handleDeleteClient(client.id)}
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
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
