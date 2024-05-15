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
import { Textarea } from '@/components/ui/textarea';
import { AppDispatch } from '@/state/store';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '@/state/products/productsSlice';
import toast from 'react-hot-toast';
import { objectToCamel } from 'ts-case-convert';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	description: z.string().min(2, {
		message: 'Description must be at least 5 characters.',
	}),
	price: z.coerce.number(),
	stock: z.coerce.number(),
});

interface ProductsFormProps {
	type: 'create' | 'update';
	data?: Product;
}

const ProductsForm = ({ type, data }: ProductsFormProps) => {
	const dispatch = useDispatch<AppDispatch>();

	// Default values for the form outside of the form hook
	const defaultValues =
		type === 'update' && data
			? objectToCamel(data)
			: {
					name: '',
					description: '',
					price: 1,
					stock: 0,
			  };
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (type === 'create' && !data) {
			// use unwrap to get the actual value from the promise

			try {
				const response = await dispatch(createProduct(values)).unwrap();

				if (response) {
					toast.success('Product created successfully');
					form.reset(defaultValues);
				}
			} catch (error) {
				toast.error('Failed to create product: ' + (error as Error).message);
			}
		}

		if (type === 'update' && data) {
			try {
				const response = await dispatch(
					updateProduct({ ...values, id: data.id })
				).unwrap();

				if (response) {
					toast.success('Product updated successfully');

					form.reset(defaultValues);
				}
			} catch (error) {
				console.log(error);
				toast.error('Failed to update product: ' + (error as Error).message);
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
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Describe a little bit the product...'
									className='resize-none'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input min='1' type='number' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='stock'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Stock</FormLabel>
							<FormControl>
								<Input type='number' {...field} />
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
export default ProductsForm;
