import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
	return (
		<div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
			{/* Sidebar */}
			<Sidebar />

			{/* Contenido principal */}
			<main className="flex-1 flex flex-col ml-72">
				{/* Header superior */}

				{/* Contenido de la página */}
				<div className="flex-1 p-8">
					<div className="max-w-7xl mx-auto">
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}
