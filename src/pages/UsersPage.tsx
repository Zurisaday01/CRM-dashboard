import { useEffect } from 'react';
import { deleteUser, getUsers } from '../state/users/usersSlice';
import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/shared/Spinner';
import PageHeader from '@/components/shared/PageHeader';
import UsersForm from '@/components/forms/UsersForm';

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

const UsersPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, users } = useSelector(
		(state: RootState) => state.users
	);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const handleDelete = async (id: number) => {
		try {
			const response = await dispatch(deleteUser({ id })).unwrap();

			if (response) {
				toast.success('User deleted successfully');
			}
		} catch (error) {
			toast.error('Failed to delete user: ' + (error as Error).message);
		}
	};

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
				<Table className='w-full bg-white rounded-md'>
					<TableCaption>A list of your users</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Last Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user: User) => (
							<TableRow key={user.id}>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.last_name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{format(user.created_at, 'PPP')}</TableCell>
								<TableCell className='flex gap-3'>
									<UpdateSheet
										entity='User'
										form={<UsersForm type='update' data={user} />}
									/>
									<DeleteEntry
										entry='user'
										onClick={() => handleDelete(user.id)}
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
export default UsersPage;
