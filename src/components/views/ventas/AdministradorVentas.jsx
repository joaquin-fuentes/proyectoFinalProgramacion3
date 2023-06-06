import React from 'react';
import { Container, Button, Table, Form, InputGroup, Row, Col } from "react-bootstrap"
import ItemVenta from './ItemVenta';

const Ventas = () => {
    return (
        <Container className='my-3 main'>
            <div className='d-flex justify-content-between '>
                <h3>Ventas</h3>
                <Button variant="success" >Agregar</Button>
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
                    <ItemVenta></ItemVenta>
                    <ItemVenta></ItemVenta>
                    <ItemVenta></ItemVenta>
                    <ItemVenta></ItemVenta>
                    <ItemVenta></ItemVenta>
                    <ItemVenta></ItemVenta>
                </tbody>
            </Table>
            <h4>Total Ingresos: $3600</h4>
        </Container>
    );
};

export default Ventas;