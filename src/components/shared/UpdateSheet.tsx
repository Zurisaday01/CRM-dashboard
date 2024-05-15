import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';

interface UpdateSheetProps {
	entity: string;
	form: JSX.Element;
}

const UpdateSheet = ({ entity, form }: UpdateSheetProps) => {
	return (
		<Sheet>
			<SheetTrigger>
				<Button variant='outline'>Edit</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create New {entity}</SheetTitle>
					<SheetDescription>Update the entry in the database.</SheetDescription>
				</SheetHeader>
				<div className='mt-4'>{form}</div>
			</SheetContent>
		</Sheet>
	);
};
export default UpdateSheet;
