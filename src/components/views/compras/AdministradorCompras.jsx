import React from 'react';
import { Container, Button, Table, Form, InputGroup, Row, Col } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import ItemCompra from './ItemCompra';
import { useEffect, useState } from 'react';
import { obtenerCompras } from '../../helpers/queries';
import Swal from "sweetalert2"

const Compras = () => {
    const [compras, setCompras] = useState([])

    useEffect(()=>{
        obtenerCompras().then((respuesta)=>{
            if (respuesta != null){
                setCompras(respuesta)
            } else{
                Swal.fire("Error", "No se pudo obtener los datos de la API", "error")
                // navegacion("/error404")
            }
        })
    },[])
    
    function calcularTotalCompras(compras) {
        let totalCompras = 0
        compras.forEach((compra)=>{
            totalCompras = totalCompras + compra.importeTotal
        })
        return totalCompras
      }

    return (
        <Container className='my-3 main'>
            <div className='mb-3 d-flex justify-content-between '>
                <h3>Compras</h3>
                <NavLink  to={"/compras/crear"} className={"mt-2 btn btn-size-lg btn-success"} >Nueva Compra</NavLink>
            </div>
            <Form>
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                    <InputGroup>
                            <InputGroup.Text>Proveedor</InputGroup.Text>
                            <Form.Control
                            type='text'
                            placeholder="Nombre Proveedor"
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
                        <th>Proveedor</th>
                        <th>Importe</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                     {
                        compras.map((compra)=>{
                            return <ItemCompra compra={compra} setCompras={setCompras} key={compra.id}></ItemCompra>
                        })
                    }
                </tbody>
            </Table>
             <h4>Total Egresos: ${calcularTotalCompras(compras)}</h4> 
        </Container>
    );
};

export default Compras;