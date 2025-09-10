import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
};
export const ProtectedRouteAuth = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { user } = useAuth();
	try {
		if (user) {
			return <Navigate to="/app/chats" />;
		}
		return <>{children}</>;
	} catch (error) {
		console.log(error);
		return <Navigate to="/" />;
	}
};
