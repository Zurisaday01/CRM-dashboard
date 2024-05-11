import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
// import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const AppLayout = () => {
	const [isOpen, setIsOpen] = useState(false);
	// handle open
	const onOpen = () => {
		setIsOpen(prev => !prev);
	};
	return (
		<div className='min-h-full bg-gradient-to-r from-cyan-100 to-cyan-200 relative flex flex-col'>
			<Sidebar onOpen={onOpen} isOpen={isOpen} />
			<div className='flex flex-col p-12 pl-20 flex-1'>
				<div className='flex flex-col flex-1 gap-10'>
					<Header />
					<main>
						<Outlet />
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default AppLayout;
