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
import { SheetFooter, SheetClose } from '@/components/ui/sheet';
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
import { getCustomers } from '@/state/customers/customersSlice';

const formSchema = z.object({
	date: z.date({
		required_error: 'Date is required.',
	}),
	total: z.coerce.number(),
	customerId: z.string(),
});

const defaultValues = {
	total: 0,
	customerId: '',
};

interface CustomersFormProps {
	type: 'create' | 'update';
	data?: Customer;
}

const SalesForm = ({ type, data }: CustomersFormProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, customers } = useSelector(
		(state: RootState) => state.customers
	);

	useEffect(() => {
		dispatch(getCustomers());
	}, [dispatch]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	if (error) return <p>Error: {error}</p>;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem className='flex flex-col w-full'>
							<FormLabel>Date</FormLabel>
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
					name='total'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Total</FormLabel>
							<FormControl>
								<Input min='0' type='number' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='customerId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Customer</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a customer' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{loading && <Spinner />}
									{customers.map((customer: Customer) => (
										<SelectItem value={customer.id.toString()}>
											{customer.name} {customer.last_name}
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
						<SheetClose asChild>
							<Button type='submit'>Create</Button>
						</SheetClose>
					</SheetFooter>
				</div>
			</form>
		</Form>
	);
};
export default SalesForm;
