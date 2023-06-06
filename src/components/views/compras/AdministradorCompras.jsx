import React from 'react';
import { Container, Button, Table, Form, InputGroup, Row, Col } from "react-bootstrap"
import ItemCompra from './ItemCompra';

const Compras = () => {
    return (
        <Container className='my-3 main'>
            <div className='mb-3 d-flex justify-content-between '>
                <h3>Compras</h3>
                <Button variant="success" >Nueva Compra</Button>
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
                    <ItemCompra></ItemCompra>
                    <ItemCompra></ItemCompra>
                    <ItemCompra></ItemCompra>
                    <ItemCompra></ItemCompra>
                    <ItemCompra></ItemCompra>
                    <ItemCompra></ItemCompra>
                </tbody>
            </Table>
            <h4>Total Egresos: $3600</h4>
        </Container>
    );
};

export default Compras;