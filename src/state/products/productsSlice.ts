import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts as getProductsApi } from '../../services/apiProducts';

interface ProductsState {
	products: Product[];
	loading: boolean;
	error: string | null;
}

// initial state
const initialState: ProductsState = {
	products: [],
	loading: false,
	error: null,
};

// async request
export const getProducts = createAsyncThunk<Product[], void>(
	'products/getProducts',
	async (_, { rejectWithValue }) => {
		try {
			const products = await getProductsApi();
			return products;
		} catch (error) {
			return rejectWithValue((error as Error).message); // Return the error message
		}
	}
);

// slice
const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// Define extra reducers to handle async actions here
		builder
			.addCase(getProducts.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch products';
			});
	},
});

// export the slice's reducer
export default productsSlice.reducer;
