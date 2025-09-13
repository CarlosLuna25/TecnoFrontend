import { useState } from "react";
import { MdPeople, MdCategory, MdAccountCircle } from "react-icons/md";
import UsersSettings from "./UsersSettings.tsx";
import CategoriesSettings from "./CategoriesSettings.tsx";

export type SettingsTab = "users" | "categories";

export default function Settings() {
	const [activeTab, setActiveTab] = useState<SettingsTab>("users");

	const tabs = [
		{
			id: "users" as SettingsTab,
			name: "Usuarios",
			icon: <MdPeople className="w-5 h-5" />,
			description: "Gestionar usuarios del sistema",
		},
		{
			id: "categories" as SettingsTab,
			name: "Categorías",
			icon: <MdCategory className="w-5 h-5" />,
			description: "Gestionar categorías de gastos e ingresos",
		},
	];

	const renderActiveComponent = () => {
		switch (activeTab) {
			case "users":
				return <UsersSettings />;
			case "categories":
				return <CategoriesSettings />;
			default:
				return <UsersSettings />;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center space-x-3 mb-4">
						<div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
							<MdAccountCircle className="w-7 h-7 text-white" />
						</div>
						<div>
							<h1 className="text-3xl font-bold text-slate-900">
								Configuración
							</h1>
							<p className="text-slate-600">
								Administra usuarios y categorías del sistema
							</p>
						</div>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="mb-8">
					<div className="border-b border-slate-200 bg-white rounded-t-xl shadow-sm">
						<nav className="flex space-x-8 px-6" aria-label="Tabs">
							{tabs.map((tab) => {
								const isActive = activeTab === tab.id;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
											isActive
												? "border-indigo-500 text-indigo-600"
												: "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
										}`}
									>
										<div
											className={`mr-3 transition-colors duration-200 ${
												isActive
													? "text-indigo-600"
													: "text-slate-400 group-hover:text-slate-600"
											}`}
										>
											{tab.icon}
										</div>
										<div className="text-left">
											<div className={isActive ? "text-indigo-600" : ""}>
												{tab.name}
											</div>
											<div className="text-xs text-slate-400 mt-1">
												{tab.description}
											</div>
										</div>
									</button>
								);
							})}
						</nav>
					</div>
				</div>

				{/* Content */}
				<div className="bg-white rounded-b-xl shadow-lg min-h-[600px]">
					{renderActiveComponent()}
				</div>
			</div>
		</div>
	);
}
