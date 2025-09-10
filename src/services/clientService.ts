import { supabase } from "./supabaseClient";
import type { CreateClientData, Client } from "../types/client";

// Nota: La tabla de clientes debe crearse usando el script SQL en la base de datos

// Crear un nuevo cliente
export const createClient = async (
	clientData: CreateClientData
): Promise<Client> => {
	const { data, error } = await supabase
		.from("clientes")
		.insert([clientData])
		.select(
			`
      *,
      estados:estado_id (
        id,
        nombre
      ),
      municipios:municipio_id (
        id,
        nombre
      )
    `
		)
		.single();

	if (error) {
		console.error("Error creando cliente:", error);
		throw error;
	}

	return data;
};

// Obtener todos los clientes
export const getClients = async (): Promise<Client[]> => {
	const { data, error } = await supabase
		.from("clientes")
		.select(
			`
      *,
      estados:estado_id (
        id,
        nombre
      ),
      municipios:municipio_id (
        id,
        nombre
      )
    `
		)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error obteniendo clientes:", error);
		throw error;
	}
	console.log(data);
	return data || [];
};

// Obtener cliente por ID
export const getClientById = async (id: string): Promise<Client | null> => {
	const { data, error } = await supabase
		.from("clientes")
		.select(
			`
      *,
      estados:estado_id (
        id,
        nombre
      ),
      municipios:municipio_id (
        id,
        nombre
      )
    `
		)
		.eq("id", id)
		.single();

	if (error) {
		if (error.code === "PGRST116") {
			return null; // No encontrado
		}
		console.error("Error obteniendo cliente:", error);
		throw error;
	}

	return data;
};

// Actualizar cliente
export const updateClient = async (
	id: number,
	clientData: Partial<CreateClientData>
): Promise<Client> => {
	const dataToUpdate = {
		nombre: clientData.nombre,
		tipo: clientData.tipo,
		estado: clientData.estado,
		presupuesto: clientData.presupuesto,
		estado_id: clientData.estado_id,
		municipio_id: clientData.municipio_id,
		direccion: clientData.direccion,
		detalles_adicionales: clientData.detalles_adicionales,
		imagen_url: clientData.imagen_url,
	};

	const { data, error } = await supabase
		.from("clientes")
		.update(dataToUpdate)
		.eq("id", id)
		.select(
			`
      *,
      estados:estado_id (
        id,
        nombre
      ),
      municipios:municipio_id (
        id,
        nombre
      )
    `
		)
		.single();

	if (error) {
		console.error("Error actualizando cliente:", error);
		throw error;
	}

	return data;
};

// Eliminar cliente
export const deleteClient = async (id: number): Promise<void> => {
	const { error } = await supabase.from("clientes").delete().eq("id", id);

	if (error) {
		console.error("Error eliminando cliente:", error);
		throw error;
	}
};

// Buscar clientes por texto
export const searchClients = async (searchTerm: string): Promise<Client[]> => {
	const { data, error } = await supabase
		.from("clientes")
		.select(
			`
      *,
      estados:estado_id (
        id,
        nombre
      ),
      municipios:municipio_id (
        id,
        nombre
      )
    `
		)
		.or(
			`nombre.ilike.%${searchTerm}%,direccion.ilike.%${searchTerm}%,detalles_adicionales.ilike.%${searchTerm}%`
		)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error buscando clientes:", error);
		throw error;
	}

	return data || [];
};
