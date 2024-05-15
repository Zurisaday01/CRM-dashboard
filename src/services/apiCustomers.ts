import { objectToSnake } from 'ts-case-convert';
import supabase from './supabase';

export const getCustomers = async () => {
	const { data, error } = await supabase
		.from('customers')
		.select('*, created_by(id, name, last_name)');

	if (error) {
		console.error(error);
		throw new Error('Customers could not be loaded');
	}
	return data;
};

export const getCustomerById = async (id: string) => {
	const { data, error } = await supabase
		.from('customers')
		.select('*, created_by(id, name, last_name)')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Customer not found');
	}

	return data;
};

export const createCustomer = async (customer: Partial<CreateCustomer>) => {
	const { data, error } = await supabase
		.from('customers')
		.insert(objectToSnake(customer))
		.select('*, created_by(id, name, last_name)')
		.single();

	if (error) {
		throw new Error('Customer could not be created');
	}
	return data;
};

export const updateCustomer = async (
	id: string,
	customer: Partial<Customer>
) => {
	const { data, error } = await supabase
		.from('customers')
		.update(objectToSnake(customer))
		.eq('id', id)
		.select('*, created_by(id, name, last_name)')
		.single();

	if (error) {
		console.error(error);
		throw new Error('Customer could not be updated');
	}
	return data;
};

export const deleteCustomer = async (id: string) => {
	// REMEMBER RLS POLICIES
	const { error } = await supabase.from('customers').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Customer could not be deleted');
	}
	return { id };
};
