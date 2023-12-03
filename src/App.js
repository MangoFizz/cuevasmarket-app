import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
    
export default App;
