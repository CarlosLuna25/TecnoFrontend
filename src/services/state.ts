import { supabase } from "./supabaseClient";

export const getStates = async () => {
	const { data, error } = await supabase.from("estados").select("*");
	if (error) throw error;
	return data;
};

export const getStateById = async (id: string) => {
	const { data, error } = await supabase
		.from("estados")
		.select("*")
		.eq("id", id);
	if (error) throw error;
	return data;
};

export const getStateByCode = async (code: string) => {
	const { data, error } = await supabase
		.from("estados")
		.select("*")
		.eq("codigo", code);
	if (error) throw error;
	return data;
};

export const getMunicipalities = async () => {
	const { data, error } = await supabase.from("municipios").select("*");
	if (error) throw error;
	return data;
};

export const getMunicipalityById = async (id: string) => {
	const { data, error } = await supabase
		.from("municipios")
		.select("*")
		.eq("id", id);
	if (error) throw error;
	return data;
};

export const getStateMunicipality = async (stateId: string) => {
	const { data, error } = await supabase
		.from("municipios")
		.select("*")
		.eq("estado_id", stateId);
	if (error) throw error;
	return data;
};
