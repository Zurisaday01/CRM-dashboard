import { useEffect } from 'react';
import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { ColDef } from 'ag-grid-community';
import Spinner from '@/components/shared/Spinner';
import { getSales } from '../state/sales/salesSlice';
import PageHeader from '@/components/shared/PageHeader';
import SalesForm from '@/components/forms/SalesForm';

const SalesPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, sales } = useSelector(
		(state: RootState) => state.sales
	);

	const colDefs: ColDef[] = [
		{ field: 'id', headerName: 'ID', sortable: true, flex: 1 },
		{ field: 'created_at', headerName: 'Created At', sortable: true, flex: 1 },
		{
			field: 'customer_name',
			headerName: 'Customer Name',
			sortable: true,
			flex: 1,
			valueGetter: function (params) {
				return (
					params.data.customer_id.name + ' ' + params.data.customer_id.last_name
				);
			},
		},
		{
			field: 'customer_email',
			headerName: 'Customer Email',
			sortable: true,
			flex: 1,
			valueGetter: function (params) {
				return params.data.customer_id.email;
			},
		},
		{ field: 'date', headerName: 'Date', sortable: true, flex: 1 },
		{ field: 'total', headerName: 'Total', sortable: true, flex: 1 },
	];

	useEffect(() => {
		dispatch(getSales());
	}, [dispatch]);

	return (
		<section>
			<PageHeader
				tableName='Sales'
				entity='Sale'
				form={<SalesForm type='create' />}
			/>
			{error && <p>Error: {error}</p>}
			{loading ? (
				<div className='w-full flex justify-center items-center'>
					<Spinner />
				</div>
			) : (
				<div className='ag-theme-quartz w-full h-[300px]'>
					<AgGridReact rowData={sales} columnDefs={colDefs} />
				</div>
			)}
		</section>
	);
};
export default SalesPage;
