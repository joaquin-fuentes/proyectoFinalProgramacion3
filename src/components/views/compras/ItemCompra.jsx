import { Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

const ItemCompra = ({key}) => {
    return (
        <tr>
        <td>1</td>
        <td>20/06/2023</td>
        <td>Coca Cola S.A</td>
        <td>$600</td>
        <td className='text-center'>
        <NavLink end to={""} className={"btn btn-outline-success"} >Ver detalle</NavLink>
        </td>
    </tr>
    );
};

export default ItemCompra;