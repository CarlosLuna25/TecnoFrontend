import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export type UserData = {
	id: string;
	email: string;
	full_name: string;
	created_at: string;
};

export type AuthContextType = {
	user: User | null;
	userData: UserData | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<User | null>;
	signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);
