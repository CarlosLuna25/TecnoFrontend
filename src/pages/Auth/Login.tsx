import React, { useState } from "react";
import logo from "../../../public/logo_black.webp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
export default function Login() {
	const { signIn } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Mock login - aquí irá la lógica de Firebase después
		await signIn(formData.email, formData.password);
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		navigate("/dashboard");
	};

	return (
		<div className="w-full space-y-6">
			{/* Header con logo */}
			<div className="text-center">
				<div className="mx-auto w-24 h-24 mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-teal-400/20">
					<img
						src={logo}
						alt="TecnoCarlos"
						className="w-16 h-16 object-contain filter brightness-0 invert"
					/>
				</div>
				<h1 className="text-3xl font-bold text-white mb-2">
					Bienvenido de vuelta
				</h1>
				<p className="text-teal-200/80 text-lg">
					Accede a tu panel de administración
				</p>
			</div>

			{/* Form */}
			<div
				className="bg-white/95 backdrop-blur-sm py-8 px-8 shadow-2xl rounded-2xl border border-teal-400/20"
				style={{
					boxShadow:
						"0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(20, 184, 166, 0.1)",
				}}
			>
				<form className="space-y-6" onSubmit={handleSubmit}>
					{/* Email Field */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-semibold text-gray-800 mb-2"
						>
							Correo electrónico
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<svg
									className="h-5 w-5 text-teal-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
									/>
								</svg>
							</div>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={formData.email}
								onChange={handleInputChange}
								className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300 ease-in-out text-gray-800 placeholder-gray-400"
								placeholder="tu@email.com"
							/>
						</div>
					</div>

					{/* Password Field */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-semibold text-gray-800 mb-2"
						>
							Contraseña
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<svg
									className="h-5 w-5 text-teal-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								required
								value={formData.password}
								onChange={handleInputChange}
								className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300 ease-in-out text-gray-800 placeholder-gray-400"
								placeholder="••••••••"
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-4 flex items-center"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<svg
										className="h-5 w-5 text-teal-500 hover:text-teal-600 transition-colors duration-200"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
										/>
									</svg>
								) : (
									<svg
										className="h-5 w-5 text-teal-500 hover:text-teal-600 transition-colors duration-200"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>

					{/* Remember me & Forgot password */}
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-gray-700 font-medium"
							>
								Recordarme
							</label>
						</div>
						<div className="text-sm">
							<a
								href="#"
								className="font-semibold text-teal-600 hover:text-teal-700 transition duration-200"
							>
								¿Olvidaste tu contraseña?
							</a>
						</div>
					</div>

					{/* Submit Button */}
					<div className="pt-4">
						<button
							type="submit"
							disabled={isLoading}
							className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
						>
							{isLoading ? (
								<div className="flex items-center">
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
									Iniciando sesión...
								</div>
							) : (
								"Iniciar sesión"
							)}
						</button>
					</div>

					{/* Social Login Buttons */}
					<div className="mt-6 grid grid-cols-2 gap-4">
						<button
							type="button"
							className="w-full inline-flex justify-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-teal-300 transition duration-300 group"
						>
							<svg
								className="h-5 w-5 group-hover:text-teal-600 transition-colors duration-300"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="currentColor"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="currentColor"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="currentColor"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span className="ml-2">Google</span>
						</button>

						<button
							type="button"
							className="w-full inline-flex justify-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-teal-300 transition duration-300 group"
						>
							<svg
								className="h-5 w-5 group-hover:text-teal-600 transition-colors duration-300"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
							<span className="ml-2">Facebook</span>
						</button>
					</div>
				</form>

				{/* Sign up link
				<div className="mt-8 text-center">
					<p className="text-sm text-gray-600">
						¿No tienes una cuenta?{" "}
						<a
							href="#"
							className="font-semibold text-teal-600 hover:text-teal-700 transition duration-200"
						>
							Regístrate aquí
						</a>
					</p>
				</div> */}
			</div>

			{/* Footer con información adicional */}
			<div className="mt-8 text-center">
				<p className="text-xs text-teal-200/60">
					© 2025 TecnoCarlos. Todos los derechos reservados.
				</p>
			</div>
		</div>
	);
}
