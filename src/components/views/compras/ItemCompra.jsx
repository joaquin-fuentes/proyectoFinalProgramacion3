import { Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import Swal from "sweetalert2"
import { consultaBorrarCompra, obtenerCompras } from "../../helpers/queries";
import { useState } from "react";

const ItemCompra = ({compra, setCompras}) => {
    
    const borrarCompra = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Seguro que deseas borrar esta Compra!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                // aqui tengo que hacer la peticion DELETE 
                consultaBorrarCompra(compra.id).then((respuesta) => {
                    if (respuesta.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            `La compra fue eliminada`,
                            'success'
                        )
                        //actualizar el sate compra del componente administrador
                        obtenerCompras().then((respuesta)=>{setCompras(respuesta)})
                        
                    } else {
                        Swal.fire("Se produjo un error", "Error, intentelo mas tarde ", "error")
                    }
                })
            }
        })
    }
    return (
        <tr>
        <td>{compra.id}</td>
        <td>{compra.fechaCompra}</td>
        <td>{compra.proveedor}</td>
        <td>${compra.importeTotal}</td>
        <td className='text-center'>
          <NavLink end to={`/compras/detalle/${compra.id}`} className={"btn btn-success"} >Ver detalle</NavLink>
          <NavLink end to={""} className={"m-1 btn btn-outline-danger"} onClick={borrarCompra} >Borrar</NavLink>
        </td>
    </tr>
    );
};

export default ItemCompra;