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
import CrearVenta from "./components/views/ventas/CrearVenta";
import CrearProducto from "./components/views/productos/CrearProducto";
import EditarProducto from "./components/views/productos/EditarProducto";
import DetalleVenta from "./components/views/ventas/DetalleVenta";
import CrearCompra from "./components/views/compras/CrearCompra";
import DetalleCompra from "./components/views/compras/DetalleCompra";






const App = () => {
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Routes>
        <Route exact path="/" element={<Inicio></Inicio>} ></Route>
        <Route exact path="/ventas" element={<AdministradorVentas></AdministradorVentas>} ></Route>
        <Route exact path="/ventas/crear" element={<CrearVenta></CrearVenta>} ></Route>
        <Route exact path="/ventas/detalle" element={<DetalleVenta></DetalleVenta>} ></Route>
        <Route exact path="/compras" element={<AdministradorCompras></AdministradorCompras>} ></Route>
        <Route exact path="/compras/crear" element={<CrearCompra></CrearCompra>} ></Route>
        <Route exact path="/compras/detalle" element={<DetalleCompra></DetalleCompra>} ></Route>
        <Route exact path="/productos" element={<AdministradorProductos></AdministradorProductos>} ></Route>
        <Route exact path="/productos/crear" element={<CrearProducto></CrearProducto>} ></Route>
        <Route exact path="/productos/editar" element={<EditarProducto></EditarProducto>} ></Route>
        <Route exact path="/resumen" element={<Resumen></Resumen>} ></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;