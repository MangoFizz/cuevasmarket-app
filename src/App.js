import logo from './logo.svg';
import './App.css';
import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StoreBranchesManagement from './pages/StoreBranchesManagement';
import StoreBranchForm from './components/StoreBranchFormCard';
import RegisterStoreBranch from './pages/RegisterStoreBranch';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CataloguePage />} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/sucursales" element={<StoreBranchesManagement />} />
                    <Route path="/registrar-sucursal" element={<RegisterStoreBranch />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
    
export default App;
