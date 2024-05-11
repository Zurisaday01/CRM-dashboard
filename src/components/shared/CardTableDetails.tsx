import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toTitleCase } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CardProps {
	title: string;
	description: string;
}

const CardTableDetails = ({ title, description }: CardProps) => {
	return (
		<Card className='w-[300px]'>
			<CardHeader>
				<CardTitle>{toTitleCase(title)}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button className='w-full' asChild>
					<Link to={`/${title}`}>View Details</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};
export default CardTableDetails;
