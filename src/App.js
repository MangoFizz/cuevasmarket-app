import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StoreBranchesManagement from './pages/StoreBranchesManagement';
import RegisterStoreBranch from './pages/RegisterStoreBranch';
import ModifyStoreBranch from './pages/ModifyStoreBranch';
import ProductsManagement from './pages/ProductsManagement';
import RegisterProduct from './pages/RegisterProduct';
import ModifyProduct from './pages/ModifyProductPage';
import UsersManagement from './pages/UsersManagement';
import RegisterUser from './pages/RegisterUser';
import ModifyUser from './pages/ModifyUser';
import RegisterCustomer from './pages/RegisterCustomer';
import { CartProvider } from "./helpers/CartContext";
import CompletePurchasePage from "./pages/CompletePurchasePage";
import './App.css';
import BranchInventoryManagement from './pages/BranchInventoryManagement';

function App() {
    return (
        <div className="App">
	        <CartProvider>
	            <BrowserRouter>
	                <Routes>
	                    <Route path="/" element={<CataloguePage />} />
	                    <Route path="/iniciar-sesion" element={<LoginPage/>} />
	                    <Route path="/cart" element={<CompletePurchasePage />} />
	                    <Route path="/registrar-cliente" element={<RegisterCustomer/>} />
	                    <Route path="/admin/sucursales" element={<StoreBranchesManagement />} />
	                    <Route path="/admin/sucursales/registrar" element={<RegisterStoreBranch />} />
	                    <Route path="/admin/sucursales/editar/:storeBranchId" element={<ModifyStoreBranch />} />
	                    <Route path="/admin/productos" element={<ProductsManagement />} />
	                    <Route path="/admin/productos/registrar" element={<RegisterProduct />} />
	                    <Route path="/admin/productos/editar/:productId" element={<ModifyProduct />} />
	                    <Route path="/admin/usuarios" element={<UsersManagement />} />
	                    <Route path="/admin/usuarios/registrar" element={<RegisterUser />} />
	                    <Route path="/admin/usuarios/editar/:userId" element={<ModifyUser />} />
	                    <Route path="/gerente/inventario" element={<BranchInventoryManagement />} />

	                </Routes>
	            </BrowserRouter>
	        </CartProvider>    
        </div>
    );
}

export default App;
