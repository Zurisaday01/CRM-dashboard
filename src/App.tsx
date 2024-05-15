import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// pages
import PageNotFound from './pages/PageNotFound';
import AppLayout from './components/AppLayout';

import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import SalesPage from './pages/SalesPage';
import UsersPage from './pages/UsersPage';

import './index.css';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route path='/' element={<Dashboard />} />
						<Route path='users' element={<UsersPage />} />
						<Route path='customers' element={<CustomersPage />} />
						<Route path='sales' element={<SalesPage />} />
						<Route path='products' element={<ProductsPage />} />
					</Route>

					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
			<Toaster
				position='top-center'
				gutter={12}
				containerStyle={{ margin: '8px' }}
				toastOptions={{
					// Default options
					success: {
						duration: 3000,
					},
					error: {
						duration: 5000,
					},
					style: {
						fontSize: '16px',
						maxWidth: '500px',
						padding: '16px 34px',
						// backgroundColor: 'var(--color-grey-0',
						// color: 'var(--color-grey-700',
					},
				}}
			/>
		</>
	);
}

export default App;
