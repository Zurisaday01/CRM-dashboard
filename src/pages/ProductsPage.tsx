import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { ColDef } from 'ag-grid-community';
import Spinner from '@/components/shared/Spinner';
import { AgGridReact } from 'ag-grid-react';
import { getProducts } from '../state/products/productsSlice';
import PageHeader from '@/components/shared/PageHeader';
import ProductsForm from '@/components/forms/ProductsForm';

const ProductsPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, products } = useSelector(
		(state: RootState) => state.products
	);

	const colDefs: ColDef[] = [
		{ field: 'id', headerName: 'ID', sortable: true, flex: 1 },
		{ field: 'created_at', headerName: 'Created At', sortable: true, flex: 1 },
		{ field: 'name', headerName: 'Name', sortable: true, flex: 1 },
		{
			field: 'description',
			headerName: 'Description',
			sortable: true,
			flex: 1,
		},
		{ field: 'price', headerName: 'Price', sortable: true, flex: 1 },
		{ field: 'stock', headerName: 'Stock', sortable: true, flex: 1 },
	];

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<section>
			<PageHeader
				tableName='Products'
				entity='Product'
				form={<ProductsForm type='create' />}
			/>
			{error && <p>Error: {error}</p>}
			{loading ? (
				<div className='w-full flex justify-center items-center'>
					<Spinner />
				</div>
			) : (
				<div className='ag-theme-quartz w-full h-[300px]'>
					<AgGridReact rowData={products} columnDefs={colDefs} />
				</div>
			)}
		</section>
	);
};
export default ProductsPage;
