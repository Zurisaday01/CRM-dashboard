import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteEntryProps {
	onClick: () => void;
	entry: string;
}

const DeleteEntry = ({ entry, onClick }: DeleteEntryProps) => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant='destructive'>Delete</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete this{' '}
						{entry}{' '}
						from the database.
					</DialogDescription>
				</DialogHeader>
				<Button variant='destructive' onClick={onClick}>
					Yes
				</Button>
			</DialogContent>
		</Dialog>
	);
};
export default DeleteEntry;
