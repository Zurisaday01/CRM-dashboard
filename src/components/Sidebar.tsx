import {
	Home,
	UsersRound,
	ShoppingBag,
	ScanBarcode,
	UserCheck,
} from 'lucide-react';
import { Twirl as Hamburger } from 'hamburger-react';
import SidebarLink from './SidebarLink';

interface SidebarProps {
	onOpen: () => void;
	isOpen: boolean;
}

const Sidebar = ({ onOpen, isOpen }: SidebarProps) => {
	return (
		<aside
			className={`h-full ${
				isOpen ? 'w-[150px]' : ' w-[50px]'
			} bg-cyan-600 border-r-2 border-cyan-100 absolute top-0 left-0 py-8 z-[50]`}>
			<div className='absolute top-0 right-[-50px]' onClick={onOpen}>
				<Hamburger direction='right' color='#0991B1' size={25} />
			</div>
			<SidebarLink href='/'>
				<Home size={24} />
				<span className={`${isOpen ? 'block' : 'hidden'}`}>Dashboard</span>
			</SidebarLink>
			<SidebarLink href='/customers'>
				<UserCheck size={24} />
				<span className={`${isOpen ? 'block' : 'hidden'}`}>Customers</span>
			</SidebarLink>
			<SidebarLink href='/products'>
				<ScanBarcode size={24} />
				<span className={`${isOpen ? 'block' : 'hidden'}`}>Products</span>
			</SidebarLink>
			<SidebarLink href='/sales'>
				<ShoppingBag size={24} />
				<span className={`${isOpen ? 'block' : 'hidden'}`}>Sales</span>
			</SidebarLink>
			<SidebarLink href='/users'>
				<UsersRound size={24} />
				<span className={`${isOpen ? 'block' : 'hidden'}`}>Users</span>
			</SidebarLink>
		</aside>
	);
};
export default Sidebar;
