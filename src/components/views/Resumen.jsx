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
            <Row className='mt-4'>
                <Col md={4}>
                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className='mb-3'>Ingresos</Card.Title>
                            <Card.Text>
                              Desde: 20/05/2022 <br />
                              Hasta: 20/06/2022 <br />
                                <h4 className='mt-3'>$75.000</h4>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card border="danger" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className='mb-3'>Egresos</Card.Title>
                            <Card.Text>
                              Desde: 20/05/2022 <br />
                              Hasta: 20/06/2022 <br />
                                <h4 className='mt-3'>$27.000</h4>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card border="warning" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Estado de resultados</Card.Title>
                            <Card.Text>
                              Desde: 20/05/2022 <br />
                              Hasta: 20/06/2022 <br />
                                <h4 className='mt-3'>$48.000</h4>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Resumen;