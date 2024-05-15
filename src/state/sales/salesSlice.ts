import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	getSales as getSalesApi,
	createSale as createSaleApi,
	deleteSale as deleteSaleApi,
	updateSale as updateSaleApi,
} from '../../services/apiSales';

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

export const createSale = createAsyncThunk<Sale, Partial<CreateSale>>(
	'sales/createSale',
	async (sale: Partial<CreateSale>, { rejectWithValue }) => {
		try {
			const newSale = await createSaleApi(sale);
			return newSale;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteSale = createAsyncThunk<{ id: string }, { id: number }>(
	'sales/deleteSale',
	async ({ id }, { rejectWithValue }) => {
		try {
			const deletedSale = await deleteSaleApi(id.toString());
			return deletedSale;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateSale = createAsyncThunk<Sale, Partial<Sale>>(
	'sales/updateSale',
	async (sale: Partial<Sale>, { rejectWithValue }) => {
		try {
			const { id, ...rest } = sale;
			const updatedSale = await updateSaleApi(id!.toString(), rest);
			return updatedSale;
		} catch (error) {
			return rejectWithValue((error as Error).message);
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
			})
			.addCase(createSale.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createSale.fulfilled, (state, action: PayloadAction<Sale>) => {
				state.loading = false;
				state.sales.push(action.payload);
			})
			.addCase(createSale.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to create sale';
			})
			.addCase(deleteSale.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				deleteSale.fulfilled,
				(state, action: PayloadAction<{ id: string }>) => {
					state.loading = false;
					state.sales = state.sales.filter(
						sale => +sale.id !== +action.payload.id
					);
				}
			)
			.addCase(deleteSale.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to delete sale';
			})
			.addCase(updateSale.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateSale.fulfilled, (state, action: PayloadAction<Sale>) => {
				state.loading = false;

				const index = state.sales.findIndex(
					sale => +sale.id === +action.payload.id
				);

				if (index !== -1) {
					state.sales[index] = action.payload;
				}
			})
			.addCase(updateSale.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to update sale';
			});
	},
});

// export the slice's reducer
export default salesSlice.reducer;
