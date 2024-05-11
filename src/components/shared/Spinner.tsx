import { HashLoader } from 'react-spinners';
const Spinner = () => {
	return (
		<div>
			<HashLoader color='#0991B1' />
			<span className='font-bold text-cyan-800'>Loading...</span>
		</div>
	);
};
export default Spinner;
