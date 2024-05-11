export {};

declare global {
	interface User {
		id: number;
		name: string;
		last_name: string;
		email: string;
		created_by: number;
	}

	interface Product {
		id: number;
		name: string;
		description: string;
		price: number;
		stock: number;
		created_by: number;
	}
	interface Customer {
		id: number;
		name: string;
		last_name: string;
		email: string;
		phone: string;
		date_of_birth: Date | string;
		address: Date | null;
		updated_at: Date | null;
		created_by: number;
	}

	interface Sale {
		id: number;
		customer_id: number;
		date: Date | null;
		total: number;
		updated_at: Date | null;
	}
}
