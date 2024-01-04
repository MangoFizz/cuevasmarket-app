import logo from './logo.svg';
import './App.css';
import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StoreBranchesManagement from './pages/StoreBranchesManagement';
import StoreBranchForm from './components/StoreBranchFormCard';
import RegisterStoreBranch from './pages/RegisterStoreBranch';
import ModifyStoreBranch from './pages/ModifyStoreBranch';
import ProductsManagement from './pages/ProductsManagement';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CataloguePage />} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/admin/sucursales" element={<StoreBranchesManagement />} />
                    <Route path="/admin/sucursales/registrar" element={<RegisterStoreBranch />} />
                    <Route path="/admin/sucursales/editar/:storeBranchId" element={<ModifyStoreBranch />} />
                    <Route path="/admin/productos" element={<ProductsManagement />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
    
export default App;
