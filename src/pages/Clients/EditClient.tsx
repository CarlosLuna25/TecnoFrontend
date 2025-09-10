import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type {
	CreateClientData,
	State,
	Municipality,
	ClientType,
	ClientStatus,
} from "../../types/client";
import { getClientById, updateClient } from "../../services/clientService";
import { getStates, getStateMunicipality } from "../../services/state";
import { useParams } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

export default function NewClient() {
	const navigate = useNavigate();
	const [firstLoad, setFirstLoad] = useState(true);
	const [loading, setLoading] = useState(false);
	const [states, setStates] = useState<State[]>([]);
	const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
	const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
	const { id } = useParams();
	const [formData, setFormData] = useState<CreateClientData>({
		nombre: "",
		tipo: "persona",
		estado: "sin_iniciar",
		presupuesto: 0,
		estado_id: 0,
		municipio_id: 0,
		direccion: "",
		detalles_adicionales: "",
		imagen_url: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	// Cargar estados al montar el componente y cargar datos del cliente
	useEffect(() => {
		const loadStates = async () => {
			try {
				const statesData = await getStates();
				setStates(statesData || []);
			} catch (error) {
				console.error("Error cargando estados:", error);
			}
		};

		const loadClient = async () => {
			try {
				const clientData = await getClientById(id || "");
				if (clientData) {
					setSelectedStateId(clientData.estado_id);
					setFirstLoad(false);
					console.log("clientData", clientData);

					setFormData(clientData);
				}
			} catch (error) {
				console.error("Error cargando datos del cliente:", error);
			}
		};
		loadStates();
		loadClient();
		return () => {
			setFirstLoad(true);
		};
	}, []);

	// Cargar municipios cuando se selecciona un estado
	useEffect(() => {
		const loadMunicipalities = async () => {
			if (selectedStateId) {
				try {
					const municipalitiesData = await getStateMunicipality(
						selectedStateId.toString()
					);
					setMunicipalities(municipalitiesData || []);
					// Limpiar municipio seleccionado al cambiar de estado
					if (!firstLoad) {
						setFormData((prev) => ({ ...prev, municipio_id: 0 }));
					}
				} catch (error) {
					console.error("Error cargando municipios:", error);
					setMunicipalities([]);
				}
			} else {
				setMunicipalities([]);
			}
		};

		loadMunicipalities();
	}, [selectedStateId]);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;

		if (name === "estado_id") {
			const stateId = parseInt(value);
			setSelectedStateId(stateId || null);
			setFormData((prev) => ({ ...prev, [name]: stateId }));
		} else if (name === "presupuesto") {
			setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
		} else if (name === "municipio_id") {
			setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}

		// Limpiar error del campo
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleImageChange = (imageUrl: string | null) => {
		setFormData((prev) => ({ ...prev, imagen_url: imageUrl || "" }));
		// Limpiar error del campo si existe
		if (errors.imagen_url) {
			setErrors((prev) => ({ ...prev, imagen_url: "" }));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.nombre.trim()) {
			newErrors.nombre = "El nombre es requerido";
		}

		if (formData.presupuesto < 0) {
			newErrors.presupuesto = "El presupuesto no puede ser negativo";
		}

		if (!formData.estado_id) {
			newErrors.estado_id = "Debe seleccionar un estado";
		}

		if (!formData.municipio_id) {
			newErrors.municipio_id = "Debe seleccionar un municipio";
		}

		if (!formData.direccion.trim()) {
			newErrors.direccion = "La dirección es requerida";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);
		try {
			await updateClient(parseInt(id || "0"), formData);
			// Redireccionar a la lista de clientes o mostrar mensaje de éxito
			navigate("/dashboard/clients");
		} catch (error) {
			console.error("Error creando cliente:", error);
			// Aquí podrías mostrar un toast o mensaje de error
		} finally {
			setLoading(false);
		}
	};

	const clientTypes: { value: ClientType; label: string }[] = [
		{ value: "persona", label: "Persona" },
		{ value: "empresa", label: "Empresa" },
	];

	const clientStatuses: { value: ClientStatus; label: string }[] = [
		{ value: "sin_iniciar", label: "Sin Iniciar" },
		{ value: "pausado", label: "Pausado" },
		{ value: "en_progreso", label: "En Progreso" },
		{ value: "finalizado", label: "Finalizado" },
	];

	return (
		<div className="max-w-4xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Nuevo Cliente</h1>
						<p className="text-gray-600 mt-2">
							Registra un nuevo cliente en el sistema
						</p>
					</div>
					<button
						onClick={() => navigate("/dashboard/clients")}
						className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
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

			{/* Formulario */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100">
				<form onSubmit={handleSubmit} className="p-8 space-y-6">
					{/* Información Básica */}
					<div className="border-b border-gray-200 pb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Información Básica
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Nombre */}
							<div>
								<label
									htmlFor="nombre"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Nombre *
								</label>
								<input
									type="text"
									id="nombre"
									name="nombre"
									value={formData.nombre}
									onChange={handleInputChange}
									className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
										errors.nombre ? "border-red-500" : "border-gray-300"
									}`}
									placeholder="Ingrese el nombre del cliente"
								/>
								{errors.nombre && (
									<p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
								)}
							</div>

							{/* Tipo */}
							<div>
								<label
									htmlFor="tipo"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Tipo *
								</label>
								<select
									id="tipo"
									name="tipo"
									value={formData.tipo}
									onChange={handleInputChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
								>
									{clientTypes.map((type) => (
										<option key={type.value} value={type.value}>
											{type.label}
										</option>
									))}
								</select>
							</div>

							{/* Estado del Proyecto */}
							<div>
								<label
									htmlFor="estado"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Estado del Proyecto *
								</label>
								<select
									id="estado"
									name="estado"
									value={formData.estado}
									onChange={handleInputChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
								>
									{clientStatuses.map((status) => (
										<option key={status.value} value={status.value}>
											{status.label}
										</option>
									))}
								</select>
							</div>

							{/* Presupuesto */}
							<div>
								<label
									htmlFor="presupuesto"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Presupuesto ($US) *
								</label>
								<input
									type="number"
									id="presupuesto"
									name="presupuesto"
									value={formData.presupuesto}
									onChange={handleInputChange}
									min="0"
									step="0.01"
									className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
										errors.presupuesto ? "border-red-500" : "border-gray-300"
									}`}
									placeholder="0.00"
								/>
								{errors.presupuesto && (
									<p className="mt-1 text-sm text-red-600">
										{errors.presupuesto}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Imagen del Cliente */}
					<div className="border-b border-gray-200 pb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Imagen del Cliente (Opcional)
						</h3>
						<div>
							<ImageUpload
								value={formData.imagen_url}
								onChange={handleImageChange}
								disabled={loading}
								className="max-w-sm"
							/>
							<p className="mt-2 text-sm text-gray-500">
								Sube una imagen del cliente para facilitar su identificación.
								Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB.
							</p>
						</div>
					</div>

					{/* Ubicación */}
					<div className="border-b border-gray-200 pb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Ubicación
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Estado */}
							<div>
								<label
									htmlFor="estado_id"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Estado *
								</label>
								<select
									id="estado_id"
									name="estado_id"
									value={formData.estado_id}
									onChange={handleInputChange}
									className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
										errors.estado_id ? "border-red-500" : "border-gray-300"
									}`}
								>
									<option value="">Seleccione un estado</option>
									{states.map((state) => (
										<option key={state.id} value={state.id}>
											{state.nombre}
										</option>
									))}
								</select>
								{errors.estado_id && (
									<p className="mt-1 text-sm text-red-600">
										{errors.estado_id}
									</p>
								)}
							</div>

							{/* Municipio */}
							<div>
								<label
									htmlFor="municipio_id"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Municipio *
								</label>
								<select
									id="municipio_id"
									name="municipio_id"
									value={formData.municipio_id}
									onChange={handleInputChange}
									disabled={!selectedStateId}
									className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
										errors.municipio_id ? "border-red-500" : "border-gray-300"
									}`}
								>
									<option value="">
										{selectedStateId
											? "Seleccione un municipio"
											: "Primero seleccione un estado"}
									</option>
									{municipalities.map((municipality) => (
										<option key={municipality.id} value={municipality.id}>
											{municipality.nombre}
										</option>
									))}
								</select>
								{errors.municipio_id && (
									<p className="mt-1 text-sm text-red-600">
										{errors.municipio_id}
									</p>
								)}
							</div>
						</div>

						{/* Dirección */}
						<div className="mt-6">
							<label
								htmlFor="direccion"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Dirección *
							</label>
							<textarea
								id="direccion"
								name="direccion"
								value={formData.direccion}
								onChange={handleInputChange}
								rows={3}
								className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none ${
									errors.direccion ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Ingrese la dirección completa del cliente"
							/>
							{errors.direccion && (
								<p className="mt-1 text-sm text-red-600">{errors.direccion}</p>
							)}
						</div>
					</div>

					{/* Detalles Adicionales */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Detalles Adicionales
						</h3>
						<div>
							<label
								htmlFor="detalles_adicionales"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Información Adicional (Opcional)
							</label>
							<textarea
								id="detalles_adicionales"
								name="detalles_adicionales"
								value={formData.detalles_adicionales}
								onChange={handleInputChange}
								rows={4}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
								placeholder="Información adicional sobre el cliente, requisitos especiales, notas, etc."
							/>
						</div>
					</div>

					{/* Botones */}
					<div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
						<button
							type="button"
							onClick={() => navigate("/dashboard/clients")}
							className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={loading}
							className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
						>
							{loading && (
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							)}
							<span>{loading ? "Guardando..." : "Guardar Cliente"}</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
