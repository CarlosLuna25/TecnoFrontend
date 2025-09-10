import { useState } from "react";

interface ImageModalProps {
	src: string;
	alt: string;
	isOpen: boolean;
	onClose: () => void;
}

export default function ImageModal({
	src,
	alt,
	isOpen,
	onClose,
}: ImageModalProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
			onClick={onClose}
		>
			<div
				className="relative max-w-4xl max-h-full p-4"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Botón de cerrar */}
				<button
					onClick={onClose}
					className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors z-10"
				>
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
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Imagen */}
				<img
					src={src}
					alt={alt}
					className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
				/>
			</div>
		</div>
	);
}

interface ClickableImageProps {
	src: string;
	alt: string;
	className?: string;
	children?: React.ReactNode;
}

export function ClickableImage({
	src,
	alt,
	className = "",
	children,
}: ClickableImageProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div
				className={`cursor-pointer ${className}`}
				onClick={() => setIsModalOpen(true)}
			>
				{children || (
					<img src={src} alt={alt} className="w-full h-full object-cover" />
				)}
			</div>
			<ImageModal
				src={src}
				alt={alt}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
}
