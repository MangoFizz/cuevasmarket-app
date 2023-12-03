import logo from './logo.svg';
import './App.css';
import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CataloguePage />} />
                    <Route path="/login" element={<LoginPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
    
export default App;
