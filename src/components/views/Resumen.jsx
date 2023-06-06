import React from 'react';
import { Container, Form, Button, InputGroup, Col, Row, Card } from 'react-bootstrap';

const Resumen = () => {
    return (
        <Container className='my-3 main'>
            <div className='mb-3 d-flex justify-content-between '>
                <h3>Resumen</h3>
            </div>
            <Form>
                <Row className="align-items-center">
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
            <Row className='mt-4 d-flex '>
                <Col md={4}>
                    <Card border="success" className='m-3 m-md-1'>
                        <Card.Body>
                            <Card.Title className='mb-3 fw-bold'>Ingresos</Card.Title>
                            <Card.Text>
                                <span>Desde: 20/05/2022</span>  <br />
                                <span>Hasta: 20/06/2022</span>  <br />
                                <span className='mt-5 fs-2 fw-bold'>$75.000 </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card border="danger" className='m-3 m-md-1'>
                        <Card.Body>
                            <Card.Title className='mb-3 fw-bold'>Egresos</Card.Title>
                            <Card.Text>
                                <span>Desde: 20/05/2022</span>  <br />
                                <span>Hasta: 20/06/2022</span>  <br />
                                <span className='mt-5 fs-2 fw-bold'>$27.000 </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card border="warning" className='m-3 m-md-1'>
                        <Card.Body>
                            <Card.Title>Estado de resultados</Card.Title>
                            <Card.Text>
                                <span>Desde: 20/05/2022</span>  <br />
                                <span>Hasta: 20/06/2022</span>  <br />
                                <span className='mt-5 fs-2 fw-bold'>$48.000 </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Resumen;