import { Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import Swal from "sweetalert2"
import { consultaBorrarVenta, obtenerVentas } from "../../helpers/queries";
import { useState } from "react";


const ItemVenta = ({venta, setVentas}) => {
    
   


    const borrarVenta = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Seguro que deseas borrar esta Venta!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                // aqui tengo que hacer la peticion DELETE 
                consultaBorrarVenta(venta.id).then((respuesta) => {
                    if (respuesta.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            `La venta fue eliminada`,
                            'success'
                        )
                        //actualizar el sate venta del componente administrador
                        obtenerVentas().then((respuesta)=>{setVentas(respuesta)})
                        
                    } else {
                        Swal.fire("Se produjo un error", "Error, intentelo mas tarde ", "error")
                    }
                })
            }
        })
    }
  
    

    return (
        <tr>
        <td>{venta.id}</td>
        <td>{venta.fechaVenta}</td>
        <td>{venta.nombreCliente}</td>
        <td>${venta.importeTotal}</td>
        <td>{venta.nombreVendedor}</td>
        <td className='text-center'>
          <NavLink end to={`/ventas/detalle/${venta.id}`} className={"btn btn-success"} >Ver detalle</NavLink>
          <NavLink end to={""} className={"m-1 btn btn-outline-danger"} onClick={borrarVenta} >Borrar</NavLink>
        </td>
    </tr>
    );
};

export default ItemVenta;