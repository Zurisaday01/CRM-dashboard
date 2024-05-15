/* eslint-disable no-mixed-spaces-and-tabs */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SheetFooter } from '@/components/ui/sheet';
import { AppDispatch } from '@/state/store';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from '@/state/users/usersSlice';
import toast from 'react-hot-toast';
import { objectToCamel } from 'ts-case-convert';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	lastName: z.string().min(2, {
		message: 'Last name must be at least 2 characters.',
	}),
	email: z.string().min(2, {
		message: 'Email must be at least 2 characters.',
	}),
});

interface UsersFormProps {
	type: 'create' | 'update';
	data?: User;
}

const UsersForm = ({ type, data }: UsersFormProps) => {
	const dispatch = useDispatch<AppDispatch>();

	// Default values for the form outside of the form hook
	const defaultValues =
		type === 'update' && data
			? objectToCamel(data)
			: {
					name: '',
					lastName: '',
					email: '',
			  };

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (type === 'create' && !data) {
			// use unwrap to get the actual value from the promise

			try {
				const response = await dispatch(createUser(values)).unwrap();

				if (response) {
					toast.success('User created successfully');
					form.reset(defaultValues);
				}
			} catch (error) {
				toast.error('Failed to create user: ' + (error as Error).message);
			}
		}
		if (type === 'update' && data) {
			try {
				const response = await dispatch(
					updateUser({ ...values, id: data.id })
				).unwrap();

				if (response) {
					toast.success('User updated successfully');

					form.reset(defaultValues);
				}
			} catch (error) {
				console.log(error);
				toast.error('Failed to update user: ' + (error as Error).message);
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='lastName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex gap-3'>
					<Button
						type='reset'
						variant='outline'
						onClick={() => form.reset(defaultValues)}>
						Cancel
					</Button>
					<SheetFooter>
						<Button type='submit'>
							{type === 'create' ? 'Create' : 'Update'}
						</Button>
					</SheetFooter>
				</div>
			</form>
		</Form>
	);
};
export default UsersForm;
