import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import { PrivateRoute } from "./middlewares/PrivateRoute";
import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";
import ClientsList from "./pages/Clients/ClientsList";
import NewClient from "./pages/Clients/NewClient";
import EditClient from "./pages/Clients/EditClient";

export default function App() {
	return (
		<Routes>
			{/* not found */}
			<Route path="/" element={<Navigate to="/login" />} />
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
				<Route index element={<Home />} />
				{/* clientes */}
				<Route path="clients" element={<ClientsList />} />
				<Route path="clients/new" element={<NewClient />} />
				<Route path="clients/:id" element={<EditClient />} />
				{/* presupuestos */}
				{/* <Route path="budgets" element={<BudgetsList />} />
				<Route path="budgets/new" element={<NewBudget />} />
				<Route path="budgets/:id" element={<EditBudget />} /> */}
				{/* gastos */}
				{/* <Route path="expenses" element={<ExpensesList />} />
				<Route path="expenses/new" element={<NewExpense />} />
				<Route path="expenses/:id" element={<EditExpense />} /> */}
				<Route path="*" element={<Home />} />
			</Route>
		</Routes>
	);
}
