import { Routes, Route } from "react-router-dom"
import Inicio from "../views/Inicio";
import AdministradorVentas from "../views/ventas/AdministradorVentas"
import CrearVenta from "../views/ventas/CrearVenta";
import EditarVenta from "../views/ventas/EditarVenta";
import AdministradorCompras from "../views/compras/AdministradorCompras"
import CrearCompra from "../views/compras/CrearCompra";
import EditarCompra from "../views/compras/EditarCompra";
import AdministradorProductos from "../views/productos/AdministradorProductos"
import CrearProducto from "../views/productos/CrearProducto";
import EditarProducto from "../views/productos/EditarProducto";
import Resumen from "../views/Resumen";

const RutasAdministrador = () => {
    return (
        <>
            <Routes>
                <Route exact path="/inicio" element={<Inicio></Inicio>} ></Route>
                <Route exact path="/ventas" element={<AdministradorVentas></AdministradorVentas>} ></Route>
                <Route exact path="/ventas/crear" element={<CrearVenta></CrearVenta>} ></Route>
                <Route exact path="/ventas/detalle/:id" element={<EditarVenta></EditarVenta>} ></Route>
                <Route exact path="/compras" element={<AdministradorCompras></AdministradorCompras>} ></Route>
                <Route exact path="/compras/crear" element={<CrearCompra></CrearCompra>} ></Route>
                <Route exact path="/compras/detalle/:id" element={<EditarCompra></EditarCompra>} ></Route>
                <Route exact path="/productos" element={<AdministradorProductos></AdministradorProductos>} ></Route>
                <Route exact path="/productos/crear" element={<CrearProducto></CrearProducto>} ></Route>
                <Route exact path="/productos/editar/:id" element={<EditarProducto></EditarProducto>} ></Route>
                <Route exact path="/resumen" element={<Resumen></Resumen>} ></Route>
            </Routes>
        </>
    );
};

export default RutasAdministrador;