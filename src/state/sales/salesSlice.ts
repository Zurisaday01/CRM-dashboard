import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSales as getSalesApi } from '../../services/apiSales';

interface SalesState {
	sales: Sale[];
	loading: boolean;
	error: string | null;
}

// initial state
const initialState: SalesState = {
	sales: [],
	loading: false,
	error: null,
};

// async request
export const getSales = createAsyncThunk<Sale[], void>(
	'sales/getSales',
	async (_, { rejectWithValue }) => {
		try {
			const sales = await getSalesApi();
			return sales;
		} catch (error) {
			return rejectWithValue((error as Error).message); // Return the error message
		}
	}
);

// slice
const salesSlice = createSlice({
	name: 'sales',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// Define extra reducers to handle async actions here
		builder
			.addCase(getSales.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getSales.fulfilled, (state, action) => {
				state.loading = false;
				state.sales = action.payload;
			})
			.addCase(getSales.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch sales';
			});
	},
});

// export the slice's reducer
export default salesSlice.reducer;
