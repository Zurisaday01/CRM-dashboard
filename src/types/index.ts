export {};

declare global {
	interface User {
		id: number;
		name: string;
		last_name: string;
		email: string;
		created_at: Date | string;
	}

	interface Product {
		id: number;
		name: string;
		description: string;
		price: number;
		stock: number;
		created_at: Date | string;
	}
	interface Customer {
		id: number;
		name: string;
		last_name: string;
		email: string;
		phone: string;
		date_of_birth: Date | string;
		address: string;
		created_by: User;
	}

	interface CreateCustomer {
		id: number;
		name: string;
		last_name: string;
		email: string;
		phone: string;
		date_of_birth: Date | string;
		address: string;
		created_by: number;
	}

	interface Sale {
		id: number;
		customer_id: Customer;
		date: Date | null;
		total: number;
		created_at: Date | string;
	}

	interface CreateSale {
		id: number;
		customer_id: number;
		date: Date | null;
		total: number;
		created_at: Date | string;
	}
}
