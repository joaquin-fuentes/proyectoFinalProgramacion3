import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Menu from "./components/common/Menu"
import Footer from "./components/common/Footer"
import Inicio from "./components/views/Inicio"
import AdministradorVentas from "./components/views/ventas/AdministradorVentas";
import AdministradorCompras from "./components/views/compras/AdministradorCompras";
import AdministradorProductos from "./components/views/productos/AdministradorProductos";
import Resumen from "./components/views/Resumen";






const App = () => {
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Routes>
        <Route exact path="/" element={<Inicio></Inicio>} ></Route>
        <Route exact path="/ventas" element={<AdministradorVentas></AdministradorVentas>} ></Route>
        <Route exact path="/compras" element={<AdministradorCompras></AdministradorCompras>} ></Route>
        <Route exact path="/productos" element={<AdministradorProductos></AdministradorProductos>} ></Route>
        <Route exact path="/resumen" element={<Resumen></Resumen>} ></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;