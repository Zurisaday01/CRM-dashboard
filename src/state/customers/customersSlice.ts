import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCustomers as getCustomersApi } from '../../services/apiCustomers';

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
			const customers = await getCustomersApi(); // Call the getUsers function
			return customers;
		} catch (error) {
			return rejectWithValue((error as Error).message); // Return the error message
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
			});
	},
});

// export the slice's reducer
export default customersSlice.reducer;
