import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getUsers as getUsersApi,
	createUser as createUserApi,
	deleteUser as deleteUserApi,
	updateUser as updateUserApi,
} from '../../services/apiUsers';

interface UsersState {
	users: User[];
	loading: boolean;
	error: string | null;
}

// initial state
const initialState: UsersState = {
	users: [],
	loading: false,
	error: null,
};

// async request
export const getUsers = createAsyncThunk<User[], void>(
	'users/getUsers',
	async (_, { rejectWithValue }) => {
		try {
			const users = await getUsersApi(); // Call the getUsers function
			return users;
		} catch (error) {
			return rejectWithValue((error as Error).message); // Return the error message
		}
	}
);

// return data type, input type
export const createUser = createAsyncThunk<User, Partial<User>>(
	'users/createUser',
	async (user: Partial<User>, { rejectWithValue }) => {
		try {
			const newUser = await createUserApi(user);
			return newUser;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteUser = createAsyncThunk<{ id: string }, { id: number }>(
	'users/deleteUser',
	async ({ id }, { rejectWithValue }) => {
		try {
			const deletedUser = await deleteUserApi(id.toString());
			return deletedUser;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateUser = createAsyncThunk<User, Partial<User>>(
	'users/updateUser',
	async (user: Partial<User>, { rejectWithValue }) => {
		try {
			const { id, ...rest } = user;
			const updatedUser = await updateUserApi(id!.toString(), rest);
			return updatedUser;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

// slice
const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// Define extra reducers to handle async actions here
		builder
			.addCase(getUsers.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch users';
			}) // Handle createUser thunk
			.addCase(createUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false;
				state.users.push(action.payload);
			})
			.addCase(createUser.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to create user';
			})
			.addCase(deleteUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				deleteUser.fulfilled,
				(state, action: PayloadAction<{ id: string }>) => {
					state.loading = false;
					state.users = state.users.filter(
						user => +user.id !== +action.payload.id
					);
				}
			)
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to delete user';
			})
			.addCase(updateUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false;
				// find the user
				const index = state.users.findIndex(
					user => +user.id === +action.payload.id
				);
				// if found, update the user
				if (index !== -1) {
					state.users[index] = action.payload;
				}
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to update user';
			});
	},
});

// export reducers
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export the slice's reducer
export default usersSlice.reducer;

//dispatch(fetchUsers())
