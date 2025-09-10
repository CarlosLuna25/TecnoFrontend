import { useState, useRef } from "react";
import { supabase } from "../services/supabaseClient";

interface ImageUploadProps {
	value?: string;
	onChange: (imageUrl: string | null) => void;
	disabled?: boolean;
	className?: string;
}

export default function ImageUpload({
	value,
	onChange,
	disabled = false,
	className = "",
}: ImageUploadProps) {
	const [dragActive, setDragActive] = useState(false);
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFiles = async (files: FileList | null) => {
		if (!files || files.length === 0) return;

		const file = files[0];

		// Validar tipo de archivo
		if (!file.type.startsWith("image/")) {
			alert("Por favor selecciona un archivo de imagen válido");
			return;
		}

		// Validar tamaño (máximo 5MB)
		if (file.size > 5 * 1024 * 1024) {
			alert("La imagen debe ser menor a 5MB");
			return;
		}

		setUploading(true);

		try {
			// Generar un nombre único para el archivo
			const fileExt = file.name.split(".").pop();
			const fileName = `${Date.now()}-${Math.random()
				.toString(36)
				.substring(2)}.${fileExt}`;
			const filePath = `client-images/${fileName}`;

			// Subir archivo a Supabase Storage
			const { error } = await supabase.storage
				.from("TecnoCarlos")
				.upload(filePath, file);

			if (error) {
				console.error("Error de Supabase Storage:", error);
				throw error;
			}

			// Obtener la URL pública del archivo
			const { data: urlData } = supabase.storage
				.from("TecnoCarlos")
				.getPublicUrl(filePath);

			if (urlData?.publicUrl) {
				console.log("urlData", urlData);
				onChange(urlData.publicUrl);
			} else {
				throw new Error("No se pudo obtener la URL pública");
			}

			setUploading(false);
		} catch (error: unknown) {
			console.error("Error subiendo imagen:", error);

			// Mensajes de error más específicos
			let errorMessage = "Error al subir la imagen";
			if (error instanceof Error) {
				if (error.message.includes("row-level security")) {
					errorMessage = "Error de permisos. Contacta al administrador.";
				} else if (error.message.includes("size")) {
					errorMessage = "La imagen es demasiado grande.";
				} else if (error.message.includes("type")) {
					errorMessage = "Tipo de archivo no permitido.";
				}
			}

			alert(errorMessage);
			setUploading(false);
		}
	};

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (disabled) return;

		const files = e.dataTransfer.files;
		handleFiles(files);
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleFiles(e.target.files);
	};

	const handleClick = () => {
		if (!disabled && fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleRemove = async () => {
		try {
			// Si es una URL de Supabase Storage, intentar eliminar el archivo
			if (value && value.includes("supabase")) {
				const url = new URL(value);
				const pathParts = url.pathname.split("/");
				const filePath = pathParts.slice(-2).join("/"); // Obtener client-images/filename.ext

				await supabase.storage.from("TecnoCarlos").remove([filePath]);
			}
		} catch (error) {
			console.error("Error eliminando archivo del storage:", error);
			// No mostrar error al usuario, ya que la imagen se elimina de la UI de todos modos
		}

		onChange(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Vista previa de la imagen */}
			{value && (
				<div className="relative">
					<div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
						<img
							src={value}
							alt="Vista previa"
							className="w-full h-full object-cover"
						/>
					</div>
					<button
						type="button"
						onClick={handleRemove}
						disabled={disabled}
						className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						title="Eliminar imagen"
					>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			)}

			{/* Área de subida */}
			{!value && (
				<div
					className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
						dragActive
							? "border-teal-400 bg-teal-50"
							: "border-gray-300 hover:border-gray-400"
					} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					onClick={handleClick}
				>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileSelect}
						disabled={disabled}
						className="hidden"
					/>

					<div className="text-center">
						{uploading ? (
							<div className="flex flex-col items-center">
								<svg
									className="animate-spin h-8 w-8 text-teal-600 mb-2"
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
								<p className="text-sm text-gray-600">Procesando imagen...</p>
							</div>
						) : (
							<>
								<svg
									className="mx-auto h-12 w-12 text-gray-400 mb-4"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 48 48"
								>
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<div className="space-y-2">
									<p className="text-sm text-gray-600">
										<span className="font-semibold text-teal-600">
											Haz clic para subir
										</span>{" "}
										o arrastra una imagen aquí
									</p>
									<p className="text-xs text-gray-500">
										PNG, JPG, GIF hasta 5MB
									</p>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
