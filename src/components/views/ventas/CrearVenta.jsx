import React, { useState, useEffect } from "react";
import { Button, Form, Container, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { obtenerProductos, consultaCrearVenta, consultaEditarProducto } from "../../helpers/queries";

const CrearVenta = () => {
    const [productos, setProductos] = useState([]);
    const [importeTotal, setImporteTotal] = useState(0)
    const [productosVendidos, setProductosVendidos] = useState([])
    const [productoAgregado, setProductoAgregado] = useState({})
    const [productosAEditar, setProductosAEditar] = useState([])


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
        buscarProductosYNuevoStock(productos, productosVendidos)


    }, [productosVendidos]);

    const onSubmit = (datos) => {
        console.log("paso la validacion")
        const nuevaVenta = { ...datos, productosVendidos: productosVendidos, importeTotal: importeTotal }
        // realizar la peticion que agrewga la venta a la api
        consultaCrearVenta(nuevaVenta).then((respuesta) => {
            if (respuesta.status === 201) {
                Swal.fire(
                    'Venta Creada!',
                    `La nueva venta fue creada con exito`,
                    'success'
                )
                console.log("Productos a editar:")
                console.log(productosAEditar)
                productosAEditar.forEach((productoAEditar) => {
                    for(let i = 0;i<productoAEditar.length;i++){
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
                setProductosVendidos([])
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

            const productoCoincide = productosVendidos.some(
                (productoVendido) => productoVendido.nombreProducto === productoAgregado.nombreProducto
            ); if (!productoCoincide) {
                setProductosVendidos([...productosVendidos, productoAgregado])
                buscarImporteTotal(productoAgregado)

            } else {
                Swal.fire(
                    "Error",
                    "El producto ya fue agregado, debe modificar la cantidad a vender",
                    "error"
                );
            }
        }



    }

    const buscarProductosYNuevoStock = (productos, productosVendidos) => {
        const nuevosProductosAEditar = [];

        productosVendidos.forEach((productoVendido) => {
            const productoCoincidente = productos.find(
                (producto) => producto.nombreProducto === productoVendido.nombreProducto
            );

            if (productoCoincidente) {
                productoCoincidente.stock = productoCoincidente.stock - productoVendido.cantidad
                nuevosProductosAEditar.push(productoCoincidente);
                setProductosAEditar([nuevosProductosAEditar])
            }
           
        });


    }

    const buscarPrecioProducto = (productoVendido) => {
        const productoCoincidente = productos.find((productoDB) => productoDB.nombreProducto === productoVendido)
        return productoCoincidente.precio
    }

    const buscarImporteTotal = (productoAgregado) => {
        console.log(importeTotal)
        let sumatoria = importeTotal + (parseInt(productoAgregado.precio) * parseInt(productoAgregado.cantidad))
        setImporteTotal(sumatoria)
    }

    const buscarStockProductoCoincidente = (productoVendido) => {
        const productoCoincidente = productos.find((productoDB) => productoDB.nombreProducto === productoVendido.nombreProducto)
        return productoCoincidente.stock - productoVendido.cantidad

    }
    const sumarCantidad = (productoVendido) => {
        if (buscarStockProductoCoincidente(productoVendido) === 0) {
            Swal.fire(
                "Error",
                "No se puede vender menos cantidad de los productos que hay en stock",
                "error"
            )
        } else {

            productoVendido.cantidad = productoVendido.cantidad + 1
            setProductosVendidos([...productosVendidos])
            setImporteTotal(importeTotal + parseInt(productoVendido.precio))

        }

    }
    const restarCantidad = (productoVendido) => {
        if (productoVendido.cantidad === 1) {
            Swal.fire(
                "Error",
                "No se puede vender menos de 1 producto, debe eliminar el producto del listado",
                "error"
            );
        } else {

            productoVendido.cantidad = productoVendido.cantidad - 1
            setProductosVendidos([...productosVendidos])
            setImporteTotal(importeTotal - parseInt(productoVendido.precio))


        }
    }

    const borrarProductoVendido = (indice, productoVendido) => {
        const nuevosProductosVendidos = [...productosVendidos];
        nuevosProductosVendidos.splice(indice, 1);
        setProductosVendidos(nuevosProductosVendidos);
        setImporteTotal(importeTotal - (parseInt(productoVendido.precio) * (parseInt(productoVendido.cantidad))))
    }


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
                        minLength={4}
                        {...register("nombreCliente", {
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
                        {errors.nombreCliente?.message}
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
                            productosVendidos.map((productoVendido, indice) => {
                                return <li key={indice}>
                                    <button type="button" className="btn btn-outline-danger p-1 m-1" onClick={() => borrarProductoVendido(indice, productoVendido)}>Borrar</button>
                                    <span> {productoVendido.nombreProducto} - </span>
                                    <span> Precio unitario: ${productoVendido.precio} - </span>
                                    <span> Cantidad a Vender:
                                        <button type="button" className="btn btn-outline-danger m-1 px-2 py-1" onClick={() => restarCantidad(productoVendido)}> - </button>
                                        {productoVendido.cantidad}
                                        <button type="button" className="btn btn-outline-primary m-1 px-2 py-1" onClick={() => sumarCantidad(productoVendido)}> + </button>
                                    </span>
                                    <span>- Stock disponible: {buscarStockProductoCoincidente(productoVendido)}</span>
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



