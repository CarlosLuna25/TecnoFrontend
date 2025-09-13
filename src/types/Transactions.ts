// Tipos para transacciones
export type TransactionType = "ingreso" | "gasto";

export interface Transaction {
	id: number;
	descripcion: string;
	monto: number;
	tipo: TransactionType;
	fecha: string;
	categoria: string;
	metodo_pago: string;
	cliente_id: number;
	created_at: string;
}

export interface Gasto {
	id: number;
	descripcion: string;
	monto: number;
	fecha: string;
	categoria: Categoria;
	metodo_pago: string;
	cliente_id: number;
	created_at: string;
}

export interface Categoria {
	id: number;
	nombre: string;
	descripcion: string;
	created_at: string;
}
export interface Ingreso {
	id: number;
	descripcion: string;
	monto: number;
	fecha: string;
	categoria: Categoria;
	metodo_pago: string;
	cliente_id: number;
	created_at: string;
}
