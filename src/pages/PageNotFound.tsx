import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const PageNotFound = () => {
	return (
		<main className='min-h-full bg-gradient-to-r from-cyan-100 to-cyan-200 flex justify-center items-center'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-center text-xl font-bold text-cyan-800'>404 - Page Not Found</h1>
				<p>The page you are looking for does not exist.</p>
				<Button asChild>
					<Link to='/' className='button'>
						Go to dashboard
					</Link>
				</Button>
			</div>
		</main>
	);
};
export default PageNotFound;
