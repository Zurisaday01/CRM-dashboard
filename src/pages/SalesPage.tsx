import { useEffect } from 'react';
import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/shared/Spinner';
import { deleteSale, getSales } from '../state/sales/salesSlice';
import PageHeader from '@/components/shared/PageHeader';
import SalesForm from '@/components/forms/SalesForm';

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

const SalesPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, sales } = useSelector(
		(state: RootState) => state.sales
	);

	useEffect(() => {
		dispatch(getSales());
	}, [dispatch]);

	const handleDelete = async (id: number) => {
		try {
			const response = await dispatch(deleteSale({ id })).unwrap();

			if (response) {
				toast.success('Sale deleted successfully');
			}
		} catch (error) {
			toast.error('Failed to delete sale: ' + (error as Error).message);
		}
	};

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
				<Table className='w-full bg-white rounded-md'>
					<TableCaption>A list of your sales</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>ID</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sales.map((sale: Sale) => (
							<TableRow key={sale.id}>
								<TableCell>{sale.id}</TableCell>
								<TableCell>${sale.total}</TableCell>
								<TableCell>
									{sale.customer_id.name} {sale.customer_id.last_name}
								</TableCell>
								<TableCell>{format(sale.date as Date, 'PPP')}</TableCell>
								<TableCell className='flex gap-3'>
									<UpdateSheet
										entity='Sale'
										form={<SalesForm type='update' data={sale} />}
									/>
									<DeleteEntry
										entry='sale'
										onClick={() => handleDelete(sale.id)}
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
export default SalesPage;
