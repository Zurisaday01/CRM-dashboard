import { objectToSnake } from 'ts-case-convert';
import supabase from './supabase';

export const getSales = async () => {
	const { data, error } = await supabase
		.from('sales')
		.select('*, customer_id(id, name, last_name, email)');

	if (error) {
		console.error(error);
		throw new Error('Sales could not be loaded');
	}
	return data;
};

export const getSaleById = async (id: string) => {
	const { data, error } = await supabase
		.from('sales')
		.select('*, customer_id(id, name, last_name, email)')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Sale not found');
	}

	return data;
};

export const createSale = async (sale: Partial<CreateSale>) => {
	const { data, error } = await supabase
		.from('sales')
		.insert(objectToSnake(sale))
		.select('*, customer_id(id, name, last_name, email)')
		.single();

	if (error) {
		throw new Error('Sale could not be created');
	}
	return data;
};

export const updateSale = async (id: string, sale: Partial<Sale>) => {
	const { data, error } = await supabase
		.from('sales')
		.update(objectToSnake(sale))
		.eq('id', id)
		.select('*, customer_id(id, name, last_name, email)')
		.single();

	if (error) {
		console.error(error);
		throw new Error('Sale could not be updated');
	}
	return data;
};

export const deleteSale = async (id: string) => {
	const { error } = await supabase.from('sales').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Sale could not be deleted');
	}
	return { id };
};
