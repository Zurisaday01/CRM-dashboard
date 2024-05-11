import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers as getUsersApi } from '../../services/apiUsers';

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
export const getUsers: any = createAsyncThunk<User[], void>(
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
			});
	},
});

// export reducers
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export the slice's reducer
export default usersSlice.reducer;

//dispatch(fetchUsers())
