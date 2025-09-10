// Tipos para el sistema de clientes

export type ClientType = "empresa" | "persona";

export type ClientStatus =
	| "sin_iniciar"
	| "pausado"
	| "en_progreso"
	| "finalizado";

export interface State {
	id: number;
	codigo: string;
	nombre: string;
	capital: string;
	created_at: string;
	updated_at: string;
}

export interface Municipality {
	id: number;
	codigo: string;
	nombre: string;
	estado_id: number;
	created_at: string;
	updated_at: string;
}

export interface CreateClientData {
	nombre: string;
	tipo: ClientType;
	estado: ClientStatus;
	presupuesto: number;
	estado_id: number;
	municipio_id: number;
	direccion: string;
	detalles_adicionales?: string;
	imagen_url?: string;
}

export interface Client extends CreateClientData {
	id: number;
	created_at: string;
	updated_at: string;
	estados: State;
	municipios: Municipality;
	estado_nombre?: string;
	municipio_nombre?: string;
	estado_id: number;
	municipio_id: number;
}
