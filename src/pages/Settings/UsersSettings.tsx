import { useState } from "react";
import {
	MdAdd,
	MdEdit,
	MdDelete,
	MdSearch,
	MdPerson,
	MdEmail,
	MdPhone,
	MdClose,
	MdSave,
} from "react-icons/md";

interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: "admin" | "usuario";
	status: "activo" | "inactivo";
	createdAt: string;
}

export default function UsersSettings() {
	const [searchTerm, setSearchTerm] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		role: "usuario" as "admin" | "usuario",
		status: "activo" as "activo" | "inactivo",
	});

	// Datos de ejemplo
	const [users, setUsers] = useState<User[]>([
		{
			id: 1,
			name: "Carlos Hernández",
			email: "carlos@tecnocarlos.com",
			phone: "+52 123 456 7890",
			role: "admin",
			status: "activo",
			createdAt: "2024-01-15",
		},
		{
			id: 2,
			name: "María González",
			email: "maria@example.com",
			phone: "+52 987 654 3210",
			role: "usuario",
			status: "activo",
			createdAt: "2024-02-20",
		},
		{
			id: 3,
			name: "Luis Rodríguez",
			email: "luis@example.com",
			phone: "+52 555 123 4567",
			role: "usuario",
			status: "inactivo",
			createdAt: "2024-03-10",
		},
	]);

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleOpenModal = (user?: User) => {
		if (user) {
			setEditingUser(user);
			setFormData({
				name: user.name,
				email: user.email,
				phone: user.phone,
				role: user.role,
				status: user.status,
			});
		} else {
			setEditingUser(null);
			setFormData({
				name: "",
				email: "",
				phone: "",
				role: "usuario",
				status: "activo",
			});
		}
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setEditingUser(null);
		setFormData({
			name: "",
			email: "",
			phone: "",
			role: "usuario",
			status: "activo",
		});
	};

	const handleSave = () => {
		if (editingUser) {
			// Editar usuario existente
			setUsers(
				users.map((user) =>
					user.id === editingUser.id ? { ...user, ...formData } : user
				)
			);
		} else {
			// Crear nuevo usuario
			const newUser: User = {
				id: Math.max(...users.map((u) => u.id)) + 1,
				...formData,
				createdAt: new Date().toISOString().split("T")[0],
			};
			setUsers([...users, newUser]);
		}
		handleCloseModal();
	};

	const handleDelete = (userId: number) => {
		if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
			setUsers(users.filter((user) => user.id !== userId));
		}
	};

	return (
		<div className="p-6">
			{/* Header */}
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
				<div>
					<h2 className="text-2xl font-bold text-slate-900 mb-2">
						Gestión de Usuarios
					</h2>
					<p className="text-slate-600">Administra los usuarios del sistema</p>
				</div>
				<button
					onClick={() => handleOpenModal()}
					className="mt-4 lg:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
				>
					<MdAdd className="w-5 h-5 mr-2" />
					Nuevo Usuario
				</button>
			</div>

			{/* Search */}
			<div className="mb-6">
				<div className="relative max-w-md">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<MdSearch className="h-5 w-5 text-slate-400" />
					</div>
					<input
						type="text"
						placeholder="Buscar usuarios..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
					/>
				</div>
			</div>

			{/* Users Table */}
			<div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-slate-200">
						<thead className="bg-slate-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
									Usuario
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
									Contacto
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
									Rol
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
									Estado
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
									Fecha Creación
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
									Acciones
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-slate-200">
							{filteredUsers.map((user) => (
								<tr
									key={user.id}
									className="hover:bg-slate-50 transition-colors duration-150"
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
												{user.name.charAt(0).toUpperCase()}
											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-slate-900">
													{user.name}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-slate-900 flex items-center">
											<MdEmail className="w-4 h-4 mr-2 text-slate-400" />
											{user.email}
										</div>
										<div className="text-sm text-slate-500 flex items-center mt-1">
											<MdPhone className="w-4 h-4 mr-2 text-slate-400" />
											{user.phone}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												user.role === "admin"
													? "bg-purple-100 text-purple-800"
													: "bg-blue-100 text-blue-800"
											}`}
										>
											{user.role === "admin" ? "Administrador" : "Usuario"}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												user.status === "activo"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{user.status === "activo" ? "Activo" : "Inactivo"}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
										{new Date(user.createdAt).toLocaleDateString("es-ES")}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<div className="flex items-center justify-end space-x-2">
											<button
												onClick={() => handleOpenModal(user)}
												className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors duration-150"
											>
												<MdEdit className="w-4 h-4" />
											</button>
											<button
												onClick={() => handleDelete(user.id)}
												className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors duration-150"
											>
												<MdDelete className="w-4 h-4" />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{filteredUsers.length === 0 && (
					<div className="text-center py-12">
						<MdPerson className="mx-auto h-12 w-12 text-slate-400" />
						<h3 className="mt-2 text-sm font-medium text-slate-900">
							No se encontraron usuarios
						</h3>
						<p className="mt-1 text-sm text-slate-500">
							{searchTerm
								? "Intenta con otro término de búsqueda"
								: "Comienza agregando un nuevo usuario"}
						</p>
					</div>
				)}
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-slate-900">
								{editingUser ? "Editar Usuario" : "Nuevo Usuario"}
							</h3>
							<button
								onClick={handleCloseModal}
								className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors duration-150"
							>
								<MdClose className="w-5 h-5" />
							</button>
						</div>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleSave();
							}}
							className="space-y-4"
						>
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Nombre completo
								</label>
								<input
									type="text"
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
									placeholder="Ej: Carlos Hernández"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Email
								</label>
								<input
									type="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
									placeholder="Ej: carlos@example.com"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Teléfono
								</label>
								<input
									type="tel"
									required
									value={formData.phone}
									onChange={(e) =>
										setFormData({ ...formData, phone: e.target.value })
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
									placeholder="Ej: +52 123 456 7890"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Rol
								</label>
								<select
									value={formData.role}
									onChange={(e) =>
										setFormData({
											...formData,
											role: e.target.value as "admin" | "usuario",
										})
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
								>
									<option value="usuario">Usuario</option>
									<option value="admin">Administrador</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Estado
								</label>
								<select
									value={formData.status}
									onChange={(e) =>
										setFormData({
											...formData,
											status: e.target.value as "activo" | "inactivo",
										})
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
								>
									<option value="activo">Activo</option>
									<option value="inactivo">Inactivo</option>
								</select>
							</div>

							<div className="flex space-x-3 pt-4">
								<button
									type="button"
									onClick={handleCloseModal}
									className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
								>
									<MdSave className="w-4 h-4 mr-2" />
									{editingUser ? "Actualizar" : "Crear"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
