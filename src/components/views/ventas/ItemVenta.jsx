import { Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

const ItemVenta = () => {
    return (
        <tr>
        <td>1</td>
        <td>20/06/2023</td>
        <td>Juan Pérez</td>
        <td>$600</td>
        <td>Joaquin Fuentes</td>
        <td className='text-center'>
        <NavLink end to={"/ventas/detalle"} className={"btn btn-success"} >Ver detalle</NavLink>
        </td>
    </tr>
    );
};

export default ItemVenta;