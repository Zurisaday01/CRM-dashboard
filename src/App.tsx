import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
	);
}

export default App;
