import React from 'react';
import { Container, Button, Table, Form, InputGroup, Row, Col } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import ItemProducto from './ItemProducto';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2"
import { obtenerProductos } from '../../../../../cafecito/src/components/helpers/queries';



const Productos = () => {

    const [productos, setProductos] = useState([])

    // const navegacion = useNavigate()

    useEffect(()=>{
        obtenerProductos().then((respuesta)=>{
            if (respuesta != null){
                setProductos(respuesta)
            } else{
                Swal.fire("Error", "No se pudo obtener los datos de la API", "error")
                // navegacion("/error404")
            }
        })
    },[])

    return (
        <Container className='my-3 main'>
            <div className='mb-3 d-flex justify-content-between '>
                <h3>Productos</h3>
                <NavLink  to={"/productos/crear"} className={"mt-2 btn btn-size-lg btn-success"} >Crear Nuevo Producto</NavLink>
            </div>
            <Form>
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                    <InputGroup>
                            <InputGroup.Text>Producto</InputGroup.Text>
                            <Form.Control
                            type='text'
                            placeholder="Nombre Producto"
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={3} className="my-1">
                        <InputGroup>
                            <InputGroup.Text>Categoría</InputGroup.Text>
                            <Form.Control
                            type='text'
                            placeholder="Nombre Categoría"
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={3} className="my-1">
                        <InputGroup>
                            <InputGroup.Text>Precio</InputGroup.Text>
                            <Form.Control
                            type='number'
                            placeholder="Precio"
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
                        <th>Nombre Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto)=>{
                           return  <ItemProducto producto={producto} setProductos={setProductos} key={producto.id}></ItemProducto>
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default Productos;