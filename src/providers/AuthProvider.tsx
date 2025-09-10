import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { AuthContext } from "../contexts/AuthContext";
import type { UserData } from "../contexts/AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState<UserData | null>(null);
	useEffect(() => {
		// Verificar sesión activa al cargar la app
		const getSession = async () => {
			const { data } = await supabase.auth.getSession();
			setUser(data.session?.user ?? null);
			setUserData({
				id: data.session?.user?.id ?? "",
				email: data.session?.user?.email ?? "",
				full_name: data.session?.user?.user_metadata.full_name ?? "",
				created_at: data.session?.user?.created_at ?? "",
			});
			setLoading(false);
		};
		getSession();

		// Escuchar cambios de sesión (login/logout)
		const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
			setUser(session?.user ?? null);
		});

		return () => {
			listener.subscription.unsubscribe();
		};
	}, []);

	const signOut = async () => {
		setUserData(null);
		setUser(null);
		await supabase.auth.signOut();
	};

	const signIn = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			return data.user;
		}
		return null;
	};

	return (
		<AuthContext.Provider value={{ user, loading, signOut, signIn, userData }}>
			{children}
		</AuthContext.Provider>
	);
}
