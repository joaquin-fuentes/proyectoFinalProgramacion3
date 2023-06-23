import React, { useState, useEffect } from "react";
import { Button, Form, Container, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { obtenerProductos, obtenerCompra, consultaEditarCompra, consultaEditarProducto } from "../../helpers/queries";
import { useParams, useNavigate } from "react-router-dom";

const EditarCompra = () => {

    const { id } = useParams()

    const [productos, setProductos] = useState([]);
    const [importeTotal, setImporteTotal] = useState(0)
    const [productosComprados, setProductosComprados] = useState([])
    const [productoAgregado, setProductoAgregado] = useState({})
    const [productosAEditar, setProductosAEditar] = useState([])


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
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
        buscarProductosYNuevoStock(productos, productosComprados)

    }, [productosComprados]);

    useEffect(() => {
        obtenerCompra(id).then((respuesta) => {
            if (respuesta != null) {
                setValue("fechaCompra", respuesta.fechaCompra)
                setValue("proveedor", respuesta.proveedor)
                setImporteTotal(respuesta.importeTotal)
                setProductosComprados(respuesta.productosComprados)
            } else {
                Swal.fire(
                    "Error",
                    "No se pudo obtener los datos de la API",
                    "error"
                );
                // navegacion("/error404")
            }
        })
    }, [])

    const onSubmit = (datos) => {
        console.log("paso la validacion")
        const nuevaCompra = { ...datos, productosComprados: productosComprados, importeTotal: importeTotal }
        // realizar la peticion que agrewga la venta a la api
        console.log("nueva venta")
        console.log(nuevaCompra)
        consultaEditarCompra(nuevaCompra, id).then((respuesta) => {
            if (respuesta.status === 200) {
                Swal.fire(
                    'Compra Editada!',
                    `La compra fue actualizada con exito`,
                    'success'
                )
                console.log("Productos a editar:")
                console.log(productosAEditar)
                productosAEditar.forEach((productoAEditar) => {
                    for (let i = 0; i < productoAEditar.length; i++) {
                        consultaEditarProducto(productoAEditar[i], productoAEditar[i].id).then((respuesta) => {
                            if (respuesta.status === 200) {
                                console.log(productoAEditar[i])
                                console.log("producto editado")
                            } else {
                                console.log("no se puedo editar el producto")
                            }
                        })
                    }

                })

                reset()
                setProductosComprados([])
                setProductoAgregado({})
                setImporteTotal(0)
            } else {
                Swal.fire(
                    'Error!',
                    `No se pudo procesar su peticion`,
                    'error'
                )
            }
        })



    };
    const agregarProducto = () => {
        if (productoAgregado.nombreProducto === "") {
            Swal.fire(
                "Error",
                "Debe seleccionar un producto para agregar",
                "error"
            );
        } else {

            const productoCoincide = productosComprados.some(
                (productoComprado) => productoComprado.nombreProducto === productoAgregado.nombreProducto
            ); if (!productoCoincide) {
                setProductosComprados([...productosComprados, productoAgregado])
                buscarImporteTotal(productoAgregado)

            } else {
                Swal.fire(
                    "Error",
                    "El producto ya fue agregado, debe modificar la cantidad a comprar",
                    "error"
                );
            }
        }



    }

    const buscarProductosYNuevoStock = (productos, productosComprados) => {
        const nuevosProductosAEditar = [];

        productosComprados.forEach((productoComprado) => {
            const productoCoincidente = productos.find(
                (producto) => producto.nombreProducto === productoComprado.nombreProducto
            );
            if (productoCoincidente) {
                productoCoincidente.stock = productoCoincidente.stock + productoComprado.cantidad
                nuevosProductosAEditar.push(productoCoincidente);
                setProductosAEditar([nuevosProductosAEditar])
            }
        });
    }

    const buscarPrecioProducto = (productoComprado) => {
        const productoCoincidente = productos.find((productoDB) => productoDB.nombreProducto === productoComprado)
        return productoCoincidente.precio*0.70
    }

    const buscarImporteTotal = (productoAgregado) => {
        console.log(importeTotal)
        let sumatoria = importeTotal + (parseInt(productoAgregado.precio) * parseInt(productoAgregado.cantidad))
        setImporteTotal(sumatoria)
    }

    const buscarStockProductoCoincidente = (productoComprado) => {
        const productoCoincidente = productos.find(
            (productoDB) => productoDB.nombreProducto === productoComprado.nombreProducto
        );
        if (productoCoincidente) {
            return productoCoincidente.stock + productoComprado.cantidad;
        } else {
            return 0; // o el valor predeterminado que desees cuando no se encuentra el producto
        }
    }
    const sumarCantidad = (productoComprado) => {
            productoComprado.cantidad = productoComprado.cantidad + 1
            setProductosComprados([...productosComprados])
            setImporteTotal(importeTotal + parseInt(productoComprado.precio))
    }
    const restarCantidad = (productoComprado) => {
        if (productoComprado.cantidad === 1) {
            Swal.fire(
                "Error",
                "No se puede comprar menos de 1 producto, debe eliminar el producto del listado",
                "error"
            );
        } else {
            productoComprado.cantidad = productoComprado.cantidad - 1
            setProductosComprados([...productosComprados])
            setImporteTotal(importeTotal - parseInt(productoComprado.precio))
        }
    }

    const borrarProductoComprado = (indice, productoComprado) => {
        const nuevosProductosComprados = [...productosComprados];
        nuevosProductosComprados.splice(indice, 1);
        setProductosComprados(nuevosProductosComprados);
        setImporteTotal(importeTotal - (parseInt(productoComprado.precio) * (parseInt(productoComprado.cantidad))))
    }


    return (
        <Container className="my-4">
            <h2>Detalle de Compra</h2>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        {...register("fechaCompra", {
                            required: "El campo es obligatorio"
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.fechaCompra?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Proveedor</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese aqui el nombre del proveedor"
                        maxLength={50}
                        minLength={4}
                        {...register("proveedor", {
                            required: "El campo es obligatorio",
                            minLength: {
                                value: 4,
                                message: "Este campo debe tener como minimo 4 caracteres"
                            },
                            maxLength: {
                                value: 50,
                                message: "Este campo debe tener como maximo 50 caracteres"
                            },
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.proveedor?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Seleccione producto</Form.Label>
                    <Button type="button" variant="outline-primary" className="mx-2 my-1" onClick={agregarProducto}>Agregar</Button>
                    <Form.Select onChange={(e) => setProductoAgregado({
                        "nombreProducto": `${e.target.value}`,
                        "precio": `${buscarPrecioProducto(e.target.value)}`,
                        "cantidad": 1
                    })}>
                        <option value="">Seleccione un producto</option>
                        {
                            productos.map((producto) => {
                                return <option key={producto.id} value={producto.nombreProducto}>{producto.nombreProducto}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <ul>
                        {
                            productosComprados.map((productoComprado, indice) => {
                                return <li key={indice}>
                                    <button type="button" className="btn btn-outline-danger p-1 m-1" onClick={() => borrarProductoComprado(indice, productoComprado)}>Borrar</button>
                                    <span> {productoComprado.nombreProducto} - </span>
                                    <span> Precio unitario: ${productoComprado.precio} - </span>
                                    <span> Cantidad a Vender:
                                        <button type="button" className="btn btn-outline-danger m-1 px-2 py-1" onClick={() => restarCantidad(productoComprado)}> - </button>
                                        {productoComprado.cantidad}
                                        <button type="button" className="btn btn-outline-primary m-1 px-2 py-1" onClick={() => sumarCantidad(productoComprado)}> + </button>
                                    </span>
                                    <span>- Stock disponible: {buscarStockProductoCoincidente(productoComprado)}</span>
                                </li>
                            })
                        }
                    </ul>
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
                <Button variant="primary" type="submit" className="mt-2">
                    Editar
                </Button>
            </Form>
        </Container>
    );
};

export default EditarCompra;



