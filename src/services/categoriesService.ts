// servicio para categorias de gastos e ingresos

import { supabase } from "./supabaseClient";
import type { Categoria } from "../types/Transactions";

// obtener todas las categorias
export const getCategories = async (): Promise<Categoria[]> => {
	try {
		const { data, error } = await supabase.from("categories").select("*");
		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Error al obtener categorías:", error);
		throw error;
	}
};

// crear una categoria
export const createCategory = async (
	category: Categoria
): Promise<Categoria> => {
	try {
		const { data } = await supabase
			.from("categories")
			.insert(category)
			.select();
		return data as unknown as Categoria;
	} catch (err) {
		console.error("Error al crear categoría:", err);
		throw err;
	}
};

// actualizar una categoria
export const updateCategory = async (
	category: Categoria
): Promise<Categoria> => {
	try {
		const { data } = await supabase
			.from("categories")
			.update(category)
			.eq("id", category.id)
			.select();
		return data as unknown as Categoria;
	} catch (err) {
		console.error("Error al actualizar categoría:", err);
		throw err;
	}
};

// eliminar una categoria
export const deleteCategory = async (id: number): Promise<string> => {
	const { error } = await supabase.from("categories").delete().eq("id", id);
	if (error) throw error;

	return "Categoria eliminada correctamente";
};
