import CardTableDetails from '@/components/shared/CardTableDetails';
import { tablesDetails } from '@/constans';

const Dashboard = () => {
	return (
		<div className='flex flex-col gap-3'>
			<p>
				Welcome to your CRM dashboard! 🎉 We're thrilled to have you here. This
				is your hub for managing all your customer relationships efficiently.
				Need assistance or have any questions? Don't hesitate to reach out.{' '}
			</p>
			<div className='flex gap-3 flex-wrap'>
				{tablesDetails.map(table => (
					<CardTableDetails
						key={table.id}
						title={table.title}
						description={table.description}
					/>
				))}
			</div>
		</div>
	);
};
export default Dashboard;
