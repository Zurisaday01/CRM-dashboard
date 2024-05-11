import { useEffect } from 'react';
import { getUsers } from '../state/users/usersSlice';
import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { ColDef } from 'ag-grid-community';
import Spinner from '@/components/shared/Spinner';
import PageHeader from '@/components/shared/PageHeader';
import UsersForm from '@/components/forms/UsersForm';

const UsersPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, users } = useSelector(
		(state: RootState) => state.users
	);

	const colDefs: ColDef[] = [
		{ field: 'id', headerName: 'ID', sortable: true, flex: 1 },
		{ field: 'created_at', headerName: 'Created At', sortable: true, flex: 1 },
		{ field: 'name', headerName: 'Name', sortable: true, flex: 1 },
		{ field: 'last_name', headerName: 'Last Name', sortable: true, flex: 1 },
		{ field: 'email', headerName: 'Email', sortable: true, flex: 1 },
	];

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<section>
			<PageHeader
				tableName='Users'
				entity='User'
				form={<UsersForm type='create' />}
			/>

			{error && <p>Error: {error}</p>}
			{loading ? (
				<div className='w-full flex justify-center items-center'>
					<Spinner />
				</div>
			) : (
				<div className='ag-theme-quartz w-full h-[300px]'>
					<AgGridReact rowData={users} columnDefs={colDefs} />
				</div>
			)}
		</section>
	);
};
export default UsersPage;
