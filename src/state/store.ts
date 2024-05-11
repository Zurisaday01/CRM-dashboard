import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import customerssReducer from './customers/customersSlice';
import salesReducer from './sales/salesSlice';
import productsReducer from './products/productsSlice';

export const store = configureStore({
	reducer: {
		// slices
		users: usersReducer,
		sales: salesReducer,
		customers: customerssReducer,
		products: productsReducer,
	},
});

// to access the state we need the => root state type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
