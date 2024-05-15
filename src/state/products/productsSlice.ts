import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	getProducts as getProductsApi,
	createProduct as createProductApi,
	deleteProduct as deleteProductApi, updateProduct as updateProductApi
} from '../../services/apiProducts';

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

export const createProduct = createAsyncThunk<Product, Partial<Product>>(
	'products/createProduct',
	async (product: Partial<Product>, { rejectWithValue }) => {
		try {
			const newProduct = await createProductApi(product);
			return newProduct;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteProduct = createAsyncThunk<{ id: string }, { id: number }>(
	'products/deleteProduct',
	async ({ id }, { rejectWithValue }) => {
		try {
			const deletedProduct = await deleteProductApi(id.toString());
			return deletedProduct;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateProduct = createAsyncThunk<Product, Partial<Product>>(
	'products/updateProduct',
	async (product: Partial<Product>, { rejectWithValue }) => {
		try {
			const { id, ...rest } = product;
			const updatedProduct = await updateProductApi(id!.toString(), rest);
			return updatedProduct;
		} catch (error) {
			return rejectWithValue((error as Error).message);
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
			})
			.addCase(createProduct.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				createProduct.fulfilled,
				(state, action: PayloadAction<Product>) => {
					state.loading = false;
					state.products.push(action.payload);
				}
			)
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to create product';
			})
			.addCase(deleteProduct.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				deleteProduct.fulfilled,
				(state, action: PayloadAction<{ id: string }>) => {
					state.loading = false;
					state.products = state.products.filter(
						product => +product.id !== +action.payload.id
					);
				}
			)
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to delete product';
			})
			.addCase(updateProduct.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
				state.loading = false;
			
				const index = state.products.findIndex(
					product => +product.id === +action.payload.id
				);
		
				if (index !== -1) {
					state.products[index] = action.payload;
				}
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to update product';
			});
	},
});

// export the slice's reducer
export default productsSlice.reducer;
