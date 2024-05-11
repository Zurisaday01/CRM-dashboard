import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { ColDef } from 'ag-grid-community';
import Spinner from '@/components/shared/Spinner';
import { getCustomers } from '../state/customers/customersSlice';
import PageHeader from '@/components/shared/PageHeader';
import CustomersForm from '@/components/forms/CustomersForm';

const CustomersPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, customers } = useSelector(
		(state: RootState) => state.customers
	);

	const colDefs: ColDef[] = [
		{ field: 'id', headerName: 'ID', sortable: true, flex: 1 },
		{ field: 'created_at', headerName: 'Created At', sortable: true, flex: 1 },
		{ field: 'name', headerName: 'Name', sortable: true, flex: 1 },
		{ field: 'last_name', headerName: 'Last Name', sortable: true, flex: 1 },
		{ field: 'email', headerName: 'Email', sortable: true, flex: 1 },
		{ field: 'phone', headerName: 'Phone', sortable: true, flex: 1 },
		{ field: 'address', headerName: 'Address', sortable: true, flex: 1 },
		{
			field: 'date_of_birth',
			headerName: 'Date of Birth',
			sortable: true,
			flex: 1,
		},
		{
			field: 'created_by',
			headerName: 'Created By',
			sortable: true,
			valueGetter: function (params) {
				return params.data.users.name + ' ' + params.data.users.last_name;
			},
		},
		{ field: 'updated_at', headerName: 'Updated At', sortable: true },
	];

	useEffect(() => {
		dispatch(getCustomers());
	}, [dispatch]);

	// TODO: get list of users (created_by field)

	return (
		<section>
			<PageHeader
				tableName='Customers'
				entity='Customer'
				form={<CustomersForm type='create' />}
			/>
			{error && <p>Error: {error}</p>}

			{loading ? (
				<div className='w-full flex justify-center items-center'>
					<Spinner />
				</div>
			) : (
				<div className='ag-theme-quartz w-full h-[300px]'>
					<AgGridReact rowData={customers} columnDefs={colDefs} />
				</div>
			)}
		</section>
	);
};
export default CustomersPage;
