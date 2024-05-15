import { useEffect } from 'react';
import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/shared/Spinner';
import {
	deleteCustomer,
	getCustomers,
} from '../state/customers/customersSlice';
import PageHeader from '@/components/shared/PageHeader';
import CustomersForm from '@/components/forms/CustomersForm';

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

const CustomersPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, customers } = useSelector(
		(state: RootState) => state.customers
	);

	useEffect(() => {
		dispatch(getCustomers());
	}, [dispatch]);

	const handleDelete = async (id: number) => {
		try {
			const response = await dispatch(deleteCustomer({ id })).unwrap();

			if (response) {
				toast.success('Customer deleted successfully');
			}
		} catch (error) {
			toast.error('Failed to delete customer: ' + (error as Error).message);
		}
	};

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
				<Table className='w-full bg-white rounded-md'>
					<TableCaption>A list of your customers</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Last Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Date of Birth</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Created By</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{customers.map((customer: Customer) => (
							<TableRow key={customer.id}>
								<TableCell>{customer.id}</TableCell>
								<TableCell>{customer.name}</TableCell>
								<TableCell>{customer.last_name}</TableCell>
								<TableCell>{customer.email}</TableCell>

								<TableCell>{format(customer.date_of_birth, 'PPP')}</TableCell>
								<TableCell>{customer.address}</TableCell>
								<TableCell>
									{customer.created_by.name} {customer.created_by.last_name}
								</TableCell>
								<TableCell className='flex gap-3'>
									<UpdateSheet
										entity='Customer'
										form={<CustomersForm type='update' data={customer} />}
									/>
									<DeleteEntry
										entry='customer'
										onClick={() => handleDelete(customer.id)}
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
export default CustomersPage;
