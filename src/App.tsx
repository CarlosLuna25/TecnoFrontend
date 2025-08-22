import { Routes, Route } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import { PrivateRoute } from "./middlewares/PrivateRoute";
import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";

export default function App() {
	return (
		<Routes>
			{/* rutas publicas */}
			<Route element={<AuthLayout />}>
				<Route path="/login" element={<Login />} />
			</Route>
			{/* rutas privadas */}
			<Route
				path="/dashboard/*"
				element={
					<PrivateRoute>
						<DashboardLayout />
					</PrivateRoute>
				}
			>
				<Route path="*" element={<Home />} />
			</Route>
		</Routes>
	);
}
