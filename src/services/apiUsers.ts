import supabase from './supabase';
import { objectToSnake } from 'ts-case-convert';

export const getUsers = async () => {
	const { data, error } = await supabase.from('users').select('*');

	if (error) {
		console.error(error);
		throw new Error('Users could not be loaded');
	}
	return data;
};

export const getUserById = async (id: string) => {
	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('User not found');
	}

	return data;
};

export const createUser = async (user: Partial<User>) => {
	const { data, error } = await supabase
		.from('users')
		.insert(objectToSnake(user))
		.select()
		.single();

	if (error) {
		throw new Error('User could not be created');
	}
	return data;
};

export const updateUser = async (id: string, user: Partial<User>) => {
	const { data, error } = await supabase
		.from('users')
		.update(objectToSnake(user))
		.eq('id', id)
		.select('*')
		.single();

	if (error) {
		console.error(error);
		throw new Error('User could not be updated');
	}
	return data;
};

export const deleteUser = async (id: string) => {
	const { error } = await supabase.from('users').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('User could not be deleted');
	}
	return { id };
};
