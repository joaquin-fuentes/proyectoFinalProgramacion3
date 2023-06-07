import { Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

const ItemProducto = ({key}) => {
    return (
        <tr>
        <td>1</td>
        <td>Pepsi 2Lts</td>
        <td>Bebidas sin alcohol</td>
        <td>$600</td>
        <td>36</td>
        <td className='text-center'>
           <NavLink end to={"/productos/editar"} className={"m-1 btn btn-success"} >Editar</NavLink>
           <NavLink end to={""} className={"m-1 btn btn-outline-danger"} >Borrar</NavLink>

        </td>
    </tr>
    );
};

export default ItemProducto;