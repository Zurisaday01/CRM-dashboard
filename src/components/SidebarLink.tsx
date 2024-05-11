import { Link } from 'react-router-dom';
const SidebarLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => {
	return (
		<Link
			to={href}
			className='text-white flex gap-2  hover:bg-white/30 duration-150 p-4'>
			{children}
		</Link>
	);
};
export default SidebarLink;
