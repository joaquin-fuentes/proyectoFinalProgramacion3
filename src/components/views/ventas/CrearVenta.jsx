import React, { useState, useEffect } from "react";
import { Button, Form, Container, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { obtenerProductos } from "../../helpers/queries";
import ItemProductoVenta from "../productos/ItemProductoVenta";

const CrearVenta = () => {
    const [productos, setProductos] = useState([]);
    const [importeTotal, setImporteTotal] = useState(0)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        obtenerProductos().then((respuesta) => {
            if (respuesta != null) {
                setProductos(respuesta);
            } else {
                Swal.fire(
                    "Error",
                    "No se pudo obtener los datos de la API",
                    "error"
                );
                // navegacion("/error404")
            }
        });
    }, []);

    const onSubmit = (data) => {
       
    };



    return (
        <Container className="my-4">
            <h2>Nueva Venta</h2>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        {...register("fechaVenta", {
                            required: "El campo es obligatorio"
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.fechaVenta?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre Cliente</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese aqui el nombre del cliente"
                        maxLength={50}
                        {...register("nombreCliente", {
                            required: "El campo es obligatorio"
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.nombreCliente?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Table striped responsive bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Cod</th>
                                <th>Nombre Producto</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th className="text-center">Vender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productos.map((producto) => {
                                    return <ItemProductoVenta importeTotal={importeTotal} setImporteTotal={setImporteTotal} producto={producto} setProductos={setProductos} key={producto.id}></ItemProductoVenta>
                                })
                            }
                        </tbody>
                    </Table>

                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Importe Total</Form.Label>
                    <Form.Control
                        type="number"
                        value={importeTotal}
                        disabled
                    />
                    <Form.Text className="text-danger">
                        {errors.importeVenta?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Vendedor</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del Vendedor"
                        maxLength={50}
                        {...register("nombreVendedor", {
                            required: "El campo es obligatorio"
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.nombreVendedor?.message}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                    Guardar
                </Button>
            </Form>
        </Container>
    );
};

export default CrearVenta;



