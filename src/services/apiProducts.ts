import { objectToSnake } from 'ts-case-convert';
import supabase from './supabase';

export const getProducts = async () => {
	const { data, error } = await supabase.from('products').select('*');

	if (error) {
		console.error(error);
		throw new Error('Products could not be loaded');
	}
	return data;
};

export const getProductById = async (id: string) => {
	const { data, error } = await supabase
		.from('products')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Produc not found');
	}

	return data;
};

export const createProduct = async (product: Partial<Product>) => {
	const { data, error } = await supabase
		.from('products')
		.insert(objectToSnake(product))
		.select()
		.single();

	if (error) {
		throw new Error('Product could not be created');
	}
	return data;
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
	const { data, error } = await supabase
		.from('products')
		.update(objectToSnake(product))
		.eq('id', id)
		.select('*')
		.single();

	if (error) {
		console.error(error);
		throw new Error('Product could not be updated');
	}
	return data;
};

export const deleteProduct = async (id: string) => {
	// REMEMBER RLS POLICIES
	const { error } = await supabase.from('products').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Product could not be deleted');
	}
	return { id };
};
