import { useState } from "react";
import {
	MdAdd,
	MdEdit,
	MdDelete,
	MdSearch,
	MdCategory,
	MdClose,
	MdSave,
	MdTrendingUp,
	MdTrendingDown,
} from "react-icons/md";
import type { TransactionType } from "../../types/Transactions";

interface Category {
	id: number;
	nombre: string;
	descripcion: string;
	tipo: TransactionType;
	color: string;
	createdAt: string;
}

export default function CategoriesSettings() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState<TransactionType | "all">("all");
	const [showModal, setShowModal] = useState(false);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [formData, setFormData] = useState({
		nombre: "",
		descripcion: "",
		tipo: "gasto" as TransactionType,
		color: "#3B82F6",
	});

	// Datos de ejemplo
	const [categories, setCategories] = useState<Category[]>([
		{
			id: 1,
			nombre: "Reparaciones",
			descripcion: "Servicios de reparación de equipos electrónicos",
			tipo: "ingreso",
			color: "#10B981",
			createdAt: "2024-01-15",
		},
		{
			id: 2,
			nombre: "Venta de Equipos",
			descripcion: "Venta de dispositivos electrónicos nuevos y usados",
			tipo: "ingreso",
			color: "#059669",
			createdAt: "2024-01-20",
		},
		{
			id: 3,
			nombre: "Accesorios",
			descripcion: "Venta de accesorios y periféricos",
			tipo: "ingreso",
			color: "#0D9488",
			createdAt: "2024-02-01",
		},
		{
			id: 4,
			nombre: "Repuestos",
			descripcion: "Compra de repuestos y componentes",
			tipo: "gasto",
			color: "#EF4444",
			createdAt: "2024-01-10",
		},
		{
			id: 5,
			nombre: "Herramientas",
			descripcion: "Adquisición de herramientas de trabajo",
			tipo: "gasto",
			color: "#DC2626",
			createdAt: "2024-02-15",
		},
		{
			id: 6,
			nombre: "Servicios",
			descripcion: "Gastos en servicios externos",
			tipo: "gasto",
			color: "#B91C1C",
			createdAt: "2024-03-01",
		},
	]);

	const filteredCategories = categories.filter((category) => {
		const matchesSearch =
			category.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
			category.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = filterType === "all" || category.tipo === filterType;
		return matchesSearch && matchesType;
	});

	const colors = [
		"#10B981",
		"#059669",
		"#0D9488",
		"#14B8A6",
		"#06B6D4",
		"#0EA5E9",
		"#3B82F6",
		"#6366F1",
		"#8B5CF6",
		"#A855F7",
		"#EF4444",
		"#DC2626",
		"#B91C1C",
		"#F97316",
		"#EA580C",
		"#D97706",
		"#CA8A04",
		"#65A30D",
		"#16A34A",
		"#059669",
	];

	const handleOpenModal = (category?: Category) => {
		if (category) {
			setEditingCategory(category);
			setFormData({
				nombre: category.nombre,
				descripcion: category.descripcion,
				tipo: category.tipo,
				color: category.color,
			});
		} else {
			setEditingCategory(null);
			setFormData({
				nombre: "",
				descripcion: "",
				tipo: "gasto",
				color: "#3B82F6",
			});
		}
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setEditingCategory(null);
		setFormData({
			nombre: "",
			descripcion: "",
			tipo: "gasto",
			color: "#3B82F6",
		});
	};

	const handleSave = () => {
		if (editingCategory) {
			// Editar categoría existente
			setCategories(
				categories.map((category) =>
					category.id === editingCategory.id
						? { ...category, ...formData }
						: category
				)
			);
		} else {
			// Crear nueva categoría
			const newCategory: Category = {
				id: Math.max(...categories.map((c) => c.id)) + 1,
				...formData,
				createdAt: new Date().toISOString().split("T")[0],
			};
			setCategories([...categories, newCategory]);
		}
		handleCloseModal();
	};

	const handleDelete = (categoryId: number) => {
		if (confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
			setCategories(
				categories.filter((category) => category.id !== categoryId)
			);
		}
	};

	const getTypeIcon = (tipo: TransactionType) => {
		return tipo === "ingreso" ? (
			<MdTrendingUp className="w-4 h-4" />
		) : (
			<MdTrendingDown className="w-4 h-4" />
		);
	};

	const getTypeColor = (tipo: TransactionType) => {
		return tipo === "ingreso" ? "text-green-600" : "text-red-600";
	};

	// const getTypeBgColor = (tipo: TransactionType) => {
	// 	return tipo === "ingreso" ? "bg-green-100" : "bg-red-100";
	// };

	return (
		<div className="p-6">
			{/* Header */}
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
				<div>
					<h2 className="text-2xl font-bold text-slate-900 mb-2">
						Gestión de Categorías
					</h2>
					<p className="text-slate-600">
						Administra las categorías de gastos e ingresos
					</p>
				</div>
				<button
					onClick={() => handleOpenModal()}
					className="mt-4 lg:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
				>
					<MdAdd className="w-5 h-5 mr-2" />
					Nueva Categoría
				</button>
			</div>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row gap-4 mb-6">
				<div className="relative flex-1 max-w-md">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<MdSearch className="h-5 w-5 text-slate-400" />
					</div>
					<input
						type="text"
						placeholder="Buscar categorías..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
					/>
				</div>
				<select
					value={filterType}
					onChange={(e) =>
						setFilterType(e.target.value as TransactionType | "all")
					}
					className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
				>
					<option value="all">Todos los tipos</option>
					<option value="ingreso">Ingresos</option>
					<option value="gasto">Gastos</option>
				</select>
			</div>

			{/* Categories Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
				{filteredCategories.map((category) => (
					<div
						key={category.id}
						className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
					>
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center space-x-3">
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
									style={{ backgroundColor: category.color }}
								>
									<MdCategory className="w-5 h-5" />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-slate-900">
										{category.nombre}
									</h3>
									<div
										className={`flex items-center space-x-1 text-sm ${getTypeColor(
											category.tipo
										)}`}
									>
										{getTypeIcon(category.tipo)}
										<span className="capitalize">{category.tipo}</span>
									</div>
								</div>
							</div>
						</div>

						<p className="text-slate-600 text-sm mb-4 line-clamp-2">
							{category.descripcion}
						</p>

						<div className="flex items-center justify-between">
							<span className="text-xs text-slate-500">
								Creado:{" "}
								{new Date(category.createdAt).toLocaleDateString("es-ES")}
							</span>
							<div className="flex items-center space-x-2">
								<button
									onClick={() => handleOpenModal(category)}
									className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors duration-150"
								>
									<MdEdit className="w-4 h-4" />
								</button>
								<button
									onClick={() => handleDelete(category.id)}
									className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors duration-150"
								>
									<MdDelete className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{filteredCategories.length === 0 && (
				<div className="text-center py-12">
					<MdCategory className="mx-auto h-12 w-12 text-slate-400" />
					<h3 className="mt-2 text-sm font-medium text-slate-900">
						No se encontraron categorías
					</h3>
					<p className="mt-1 text-sm text-slate-500">
						{searchTerm || filterType !== "all"
							? "Intenta con otros filtros de búsqueda"
							: "Comienza agregando una nueva categoría"}
					</p>
				</div>
			)}

			{/* Summary */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
							<MdTrendingUp className="w-4 h-4 text-white" />
						</div>
						<div>
							<p className="text-sm text-green-600 font-medium">
								Categorías de Ingresos
							</p>
							<p className="text-2xl font-bold text-green-700">
								{categories.filter((c) => c.tipo === "ingreso").length}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
							<MdTrendingDown className="w-4 h-4 text-white" />
						</div>
						<div>
							<p className="text-sm text-red-600 font-medium">
								Categorías de Gastos
							</p>
							<p className="text-2xl font-bold text-red-700">
								{categories.filter((c) => c.tipo === "gasto").length}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
							<MdCategory className="w-4 h-4 text-white" />
						</div>
						<div>
							<p className="text-sm text-blue-600 font-medium">
								Total Categorías
							</p>
							<p className="text-2xl font-bold text-blue-700">
								{categories.length}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-slate-900">
								{editingCategory ? "Editar Categoría" : "Nueva Categoría"}
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
									Nombre
								</label>
								<input
									type="text"
									required
									value={formData.nombre}
									onChange={(e) =>
										setFormData({ ...formData, nombre: e.target.value })
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
									placeholder="Ej: Reparaciones"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Descripción
								</label>
								<textarea
									required
									value={formData.descripcion}
									onChange={(e) =>
										setFormData({ ...formData, descripcion: e.target.value })
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
									placeholder="Describe el propósito de esta categoría"
									rows={3}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Tipo
								</label>
								<select
									value={formData.tipo}
									onChange={(e) =>
										setFormData({
											...formData,
											tipo: e.target.value as TransactionType,
										})
									}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
								>
									<option value="gasto">Gasto</option>
									<option value="ingreso">Ingreso</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Color
								</label>
								<div className="flex items-center space-x-3">
									<input
										type="color"
										value={formData.color}
										onChange={(e) =>
											setFormData({ ...formData, color: e.target.value })
										}
										className="w-12 h-10 border border-slate-300 rounded-lg cursor-pointer"
									/>
									<div className="flex-1">
										<div className="grid grid-cols-10 gap-2">
											{colors.map((color) => (
												<button
													key={color}
													type="button"
													onClick={() => setFormData({ ...formData, color })}
													className={`w-6 h-6 rounded-full border-2 transition-all duration-150 ${
														formData.color === color
															? "border-slate-400 scale-110"
															: "border-slate-200 hover:border-slate-300"
													}`}
													style={{ backgroundColor: color }}
												/>
											))}
										</div>
									</div>
								</div>
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
									{editingCategory ? "Actualizar" : "Crear"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
