import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import Spinner from '@/components/shared/Spinner';
import { deleteProduct, getProducts } from '../state/products/productsSlice';
import PageHeader from '@/components/shared/PageHeader';
import ProductsForm from '@/components/forms/ProductsForm';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import DeleteEntry from '@/components/shared/DeleteEntry';
import UpdateSheet from '@/components/shared/UpdateSheet';

const ProductsPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, products } = useSelector(
		(state: RootState) => state.products
	);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const handleDelete = async (id: number) => {
		try {
			const response = await dispatch(deleteProduct({ id })).unwrap();

			if (response) {
				toast.success('Product deleted successfully');
			}
		} catch (error) {
			toast.error('Failed to delete product: ' + (error as Error).message);
		}
	};

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
				<Table className='w-full bg-white rounded-md'>
					<TableCaption>A list of your products</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product: Product) => (
							<TableRow key={product.id}>
								<TableCell>{product.id}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.description}</TableCell>
								<TableCell>${product.price}</TableCell>
								<TableCell>{product.stock}</TableCell>
								<TableCell>{format(product.created_at, 'PPP')}</TableCell>
								<TableCell className='flex gap-3'>
									<UpdateSheet
										entity='Product'
										form={<ProductsForm type='update' data={product} />}
									/>
									<DeleteEntry
										entry='product'
										onClick={() => handleDelete(product.id)}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</section>
	);
};
export default ProductsPage;
