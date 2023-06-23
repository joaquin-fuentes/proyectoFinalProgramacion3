import { Button } from "react-bootstrap"
import Swal from "sweetalert2"
import {consultaBorrarProducto, obtenerProductos} from "../../helpers/queries.js"
import { useState, useEffect } from "react";


const ItemProducto = ({importeTotal, setProductos, producto, setImporteTotal}) => {
    const [cantidadVenta, setCantidadVenta] = useState(0)

   
    const consultarImporteTotal=()=>{
        setImporteTotal(cantidadVenta*producto.precio)
    }
    const sumarCantidadVenta = ()=>{
        if(producto.stock === 0){
            Swal.fire(
                "Error",
                "No se puede vender mas de la cantidad que hay en stock",
                "error"
            );
        } else{
            producto.stock = producto.stock - 1
            setCantidadVenta(cantidadVenta+1)
            consultarImporteTotal()
            
        }
    }
    const restarCantidadVenta = ()=>{
        if(cantidadVenta === 0){
            Swal.fire(
                "Error",
                "No se puede vender menos de 0",
                "error"
            );
        } else{
            producto.stock = producto.stock + 1
            setCantidadVenta(cantidadVenta-1)
            consultarImporteTotal()
            
            console.log(importeTotal)
        }
    }
   
    return (
        <tr>
        <td>{producto.id}</td>
        <td>{producto.nombreProducto}</td>
        <td>{producto.categoria}</td>
        <td>${producto.precio}</td>
        <td>{producto.stock}</td>
        <td className='text-center'>
           <Button className="m-1"  variant="outline-danger" onClick={restarCantidadVenta}  >-</Button>
           <span className="mx-1">{cantidadVenta}</span>
           <Button className="m-1"  variant="outline-primary" onClick={sumarCantidadVenta}  >+</Button>
        </td>
    </tr>
    );
};

export default ItemProducto;