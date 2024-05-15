/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect } from 'react';
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
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../shared/Spinner';
import { format } from 'date-fns';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { getUsers } from '@/state/users/usersSlice';
import toast from 'react-hot-toast';
import { createCustomer, updateCustomer } from '@/state/customers/customersSlice';
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
	phone: z.string().min(2, {
		message: 'Phone must be at least 2 characters.',
	}),
	address: z.string().min(2, {
		message: 'Address must be at least 2 characters.',
	}),
	dateOfBirth: z.date({
		required_error: 'A date of birth is required.',
	}),
	createdBy: z.string(),
});

interface CustomersFormProps {
	type: 'create' | 'update';
	data?: Customer;
}

const CustomersForm = ({ type, data }: CustomersFormProps) => {
	// Get list of users (created_by field)
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, users } = useSelector(
		(state: RootState) => state.users
	);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);


	const defaultValues =
		type === 'update' && data
			? {
					...objectToCamel(data),
					dateOfBirth:
						typeof data.date_of_birth === 'string'
							? new Date(data.date_of_birth)
							: data.date_of_birth,
					createdBy: data.created_by?.id?.toString(), 
			  }
			: {
					name: '',
					lastName: '',
					email: '',
					phone: '',
					address: '',
					createdBy: '',
			  };

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (type === 'create' && !data) {
			// use unwrap to get the actual value from the promise
			console.log(values);
			try {
				const response = await dispatch(
					createCustomer({ ...values, created_by: parseInt(values.createdBy) })
				).unwrap();

				if (response) {
					toast.success('Customer created successfully');
					form.reset(defaultValues);
				}
			} catch (error) {
				console.log(error);
				toast.error('Failed to create customer: ' + (error as Error).message);
			}
		}

		if (type === 'update' && data) {
			try {
				const response = await dispatch(
					updateCustomer({ ...values, id: data.id })
				).unwrap();

				if (response) {
					toast.success('Customer updated successfully');

					form.reset(defaultValues);
				}
			} catch (error) {
				console.log(error);
				toast.error('Failed to update customer: ' + (error as Error).message);
			}
		}
	};

	if (error) return <p>Error: {error}</p>;

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
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='address'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='dateOfBirth'
					render={({ field }) => (
						<FormItem className='flex flex-col w-full'>
							<FormLabel>Date of birth</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-full pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-full p-0' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={date =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='createdBy'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Created By</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a user' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{loading && <Spinner />}
									{users.map((user: User) => (
										<SelectItem value={user.id.toString()}>
											{user.name} {user.last_name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
export default CustomersForm;
