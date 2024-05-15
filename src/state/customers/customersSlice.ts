import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getCustomers as getCustomersApi,
	createCustomer as createCustomerApi, deleteCustomer as deleteCustomerApi, updateCustomer as updateCustomerApi
} from '../../services/apiCustomers';

interface CustomersState {
	customers: Customer[];
	loading: boolean;
	error: string | null;
}

// initial state
const initialState: CustomersState = {
	customers: [],
	loading: false,
	error: null,
};

// async request
export const getCustomers = createAsyncThunk<Customer[], void>(
	'customers/getCustomers',
	async (_, { rejectWithValue }) => {
		try {
			const customers = await getCustomersApi(); 
			return customers;
		} catch (error) {
			return rejectWithValue((error as Error).message); // Return the error message
		}
	}
);

export const createCustomer = createAsyncThunk<
	Customer,
	Partial<CreateCustomer>
>(
	'customers/createCustomer',
	async (customer: Partial<CreateCustomer>, { rejectWithValue }) => {
		try {
			const newCustomer = await createCustomerApi(customer);
			return newCustomer;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteCustomer = createAsyncThunk<{ id: string }, { id: number }>(
	'customers/deleteCustomer',
	async ({ id }, { rejectWithValue }) => {
		try {
			const deletedCustomer = await deleteCustomerApi(id.toString());
			return deletedCustomer;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateCustomer = createAsyncThunk<Customer, Partial<Customer>>(
	'customers/updateCustomer',
	async (customer: Partial<Customer>, { rejectWithValue }) => {
		try {
			const { id, ...rest } = customer;
			const updatedCustomer = await updateCustomerApi(id!.toString(), rest);
			return updatedCustomer;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

// slice
const customersSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// Define extra reducers to handle async actions here
		builder
			.addCase(getCustomers.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getCustomers.fulfilled, (state, action) => {
				state.loading = false;
				state.customers = action.payload;
			})
			.addCase(getCustomers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch customers';
			})
			.addCase(createCustomer.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				createCustomer.fulfilled,
				(state, action: PayloadAction<Customer>) => {
					state.loading = false;
					state.customers.push(action.payload);
				}
			)
			.addCase(createCustomer.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to create product';
			})
			.addCase(deleteCustomer.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				deleteCustomer.fulfilled,
				(state, action: PayloadAction<{ id: string }>) => {
					state.loading = false;
					state.customers = state.customers.filter(
						customer => +customer.id !== +action.payload.id
					);
				}
			)
			.addCase(deleteCustomer.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to delete customer';
			})
			.addCase(updateCustomer.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
				state.loading = false;
				
				const index = state.customers.findIndex(
					customer => +customer.id === +action.payload.id
				);
				
				if (index !== -1) {
					state.customers[index] = action.payload;
				}
			})
			.addCase(updateCustomer.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to update customer';
			});
	},
});

// export the slice's reducer
export default customersSlice.reducer;
