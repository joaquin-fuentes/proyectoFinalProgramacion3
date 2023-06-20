import { Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import Swal from "sweetalert2"
import {consultaBorrarProducto, obtenerProductos} from "../../helpers/queries.js"

const ItemProducto = ({setProductos, producto}) => {

    const borrarProducto = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Seguro que deseas borrar el producto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                // aqui tengo que hacer la peticion DELETE 
                consultaBorrarProducto(producto.id).then((respuesta) => {
                    if (respuesta.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            `El producto ${producto.nombreProducto} fue eliminado`,
                            'success'
                        )
                        //actualizar el sate producto del componente administrador
                        obtenerProductos().then((respuesta)=>{setProductos(respuesta)})
                        
                    } else {
                        Swal.fire("Se produjo un error", "Error, intentelo mas tarde ", "error")
                    }
                })
            }
        })
    }
    return (
        <tr>
        <td>{producto.id}</td>
        <td>{producto.nombreProducto}</td>
        <td>{producto.categoria}</td>
        <td>${producto.precio}</td>
        <td>{producto.stock}</td>
        <td className='text-center'>
           <NavLink end to={`/productos/editar/${producto.id}`} className={"m-1 btn btn-success"} >Editar</NavLink>
           <NavLink end to={""} className={"m-1 btn btn-outline-danger"} onClick={borrarProducto} >Borrar</NavLink>

        </td>
    </tr>
    );
};

export default ItemProducto;