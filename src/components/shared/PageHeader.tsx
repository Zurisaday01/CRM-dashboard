import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

interface PageHeaderProps {
	tableName: string;
	entity: string;
	form: JSX.Element;
}

const PageHeader = ({ tableName, entity, form }: PageHeaderProps) => {
	return (
		<header className='flex justify-between mb-8'>
			<h2 className='text-xl font-bold text-cyan-800'>{tableName}</h2>

			<Sheet>
				<SheetTrigger asChild>
					<Button>Create New {entity}</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Create New {entity}</SheetTitle>
						<SheetDescription>
							Create a new entry in the database. Click create when you're done
							😃
						</SheetDescription>
					</SheetHeader>
					<div className='mt-4'>{form}</div>
				</SheetContent>
			</Sheet>
		</header>
	);
};
export default PageHeader;
