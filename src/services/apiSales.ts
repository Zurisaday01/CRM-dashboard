import supabase from './supabase';

export const getSales = async () => {
	const { data, error } = await supabase
		.from('sales')
		.select('*, customer_id(name, last_name, email)');

	if (error) {
		console.error(error);
		throw new Error('Sales could not be loaded');
	}
	return data;
};

export const getSaleById = async (id: string) => {
	const { data, error } = await supabase
		.from('sales')
		.select('*, customer_id(name, last_name, email)')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Sale not found');
	}

	return data;
};

export const updateSale = async (id: string, sale: Partial<Sale>) => {
	const { data, error } = await supabase
		.from('sales')
		.update(sale)
		.eq('id', id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error('Sale could not be updated');
	}
	return data;
};

export const deleteSale = async (id: string) => {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from('sales').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Sale could not be deleted');
	}
	return data;
};
