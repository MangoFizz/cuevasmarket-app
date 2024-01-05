import logo from "./logo.svg";
import "./App.css";
import CataloguePage from "./pages/CataloguePage";
import CompletePurchasePage from "./pages/CompletePurchasePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreBranchesManagement from "./pages/StoreBranchesManagement";
import StoreBranchForm from "./components/StoreBranchFormCard";
import RegisterStoreBranch from "./pages/RegisterStoreBranch";
import { CartProvider } from "./helpers/CartContext";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CataloguePage />} />
            <Route path="/cart" element={<CompletePurchasePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin/sucursales"
              element={<StoreBranchesManagement />}
            />
            <Route
              path="/admin/registrar-sucursal"
              element={<RegisterStoreBranch />}
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
