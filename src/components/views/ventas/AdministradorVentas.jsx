import React from 'react';
import { Container, Button, Table, Form, InputGroup, Row, Col } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import ItemVenta from './ItemVenta';
import { useEffect, useState } from 'react';
import { obtenerVentas } from '../../helpers/queries';
import Swal from "sweetalert2"


const Ventas = () => {
    const [ventas, setVentas] = useState([])

    useEffect(()=>{
        obtenerVentas().then((respuesta)=>{
            if (respuesta != null){
                setVentas(respuesta)
            } else{
                Swal.fire("Error", "No se pudo obtener los datos de la API", "error")
                // navegacion("/error404")
            }
        })
    },[])

    
    function calcularTotalVentas(ventas) {
        let totalVentas = 0;
        let totalVenta = 0
        
        ventas.forEach((venta)=>{
            venta.productosVendidos.forEach(producto => {
                const precioProducto = producto.precio;
                const cantidadVendida = producto.cantidad;
                
                const importeProducto = precioProducto * cantidadVendida;
                
                totalVenta += importeProducto;
                return totalVenta
              })
        })
        return totalVenta;
      }
      
    return (
        <Container className='my-3 main'>
            <div className='mb-3 d-flex justify-content-between '>
                <h3>Ventas</h3>
                <NavLink  to={"/ventas/crear"} className={"mt-2 btn btn-size-lg btn-success"} >Nueva Venta</NavLink>
            </div>
            <Form>
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                    <InputGroup>
                            <InputGroup.Text>Vendedor</InputGroup.Text>
                            <Form.Control
                            type='text'
                            placeholder="Nombre Vendedor"
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={3} className="my-1">
                        <InputGroup>
                            <InputGroup.Text>Desde</InputGroup.Text>
                            <Form.Control
                            type='date'
                            placeholder="Desde"
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={3} className="my-1">
                        <InputGroup>
                            <InputGroup.Text>Hasta</InputGroup.Text>
                            <Form.Control
                            type='date'
                            placeholder="Hasta"
                            />
                        </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                        <Button type="submit" variant='outline-success'>Buscar</Button>
                    </Col>
                </Row>
            </Form>
            <hr />
            <Table striped responsive bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Importe</th>
                        <th>Vendedor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas.map((venta)=>{
                            return <ItemVenta venta={venta} setVentas={setVentas} key={venta.id}></ItemVenta>
                        })
                    }
                    
                </tbody>
            </Table>
            <h4>Total Ingresos: ${calcularTotalVentas(ventas)}</h4>
        </Container>
    );
};

export default Ventas;