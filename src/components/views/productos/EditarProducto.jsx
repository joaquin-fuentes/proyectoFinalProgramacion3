import { Button, Form, Container } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { consultaEditarProducto, obtenerProducto } from "../../helpers/queries";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const EditarProducto = () => {

    const { id } = useParams()
    const navegacion = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const onSubmit = (productoEditado) => {
        console.log("paso la validacion")
        consultaEditarProducto(productoEditado, id).then((respuesta)=>{
                if(respuesta && respuesta.status === 200){
                    Swal.fire("Producto actualizado",
                    `El producto: ${productoEditado.nombreProducto} fue actualizado corretamente`,
                     "success")
                     navegacion("/productos")
                } else{
                    Swal.fire("Ocurrio un error",
                    `El producto: ${productoEditado.nombreProducto} NO fue actualizado. Intente esta operacion luego`,
                     "error")
                }
            
        })
    }

    useEffect(() => {
        obtenerProducto(id).then((respuesta) => {
            setValue("nombreProducto", respuesta.nombreProducto)
            setValue("precio", respuesta.precio)
            setValue("categoria", respuesta.categoria)
            setValue("stock", respuesta.stock)
        })

    }, [])

    return (
        <Container className="my-4">
            <h2>Detalle producto</h2>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Producto*</Form.Label>
                    <Form.Control type="text" placeholder="Nombre del producto" maxLength={30} {
                        ...register('nombreProducto', {
                            required: 'El campo es obligatorio',
                            minLength: {
                                value: 2,
                                message: "Este campo debe tener como minimo 2 caracteres"
                            },
                            maxLength: {
                                value: 30,
                                message: "Este campo debe tener como maximo 30 caracteres"
                            }
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.nombreProducto?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control type="number" placeholder="Ej:50" maxLength={5} {
                        ...register('precio', {
                            required: 'El campo es obligatorio',
                            pattern: {
                                value: /^(?:[1-9]\d{0,4}|100000)$/,
                                message: "Debe ingresar un numero entre 1 y 1000000"
                            }
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.precio?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Categoria*</Form.Label>
                    {/* CONSULTAR A LOS PROFES DONDE VAN LAS VALIDACIONES EN ESTE CASO */}
                    <Form.Select aria-label="Default select example" {
                        ...register('categoria', {
                            required: 'Debe seleccionar una categoria',
                        })}>
                       <option value="">Seleccione una opcion</option>
                        <option value="Bebidas sin alcohol">Bebidas sin alcohol</option>
                        <option value="Bebidas con alcohol">Bebidas con alcohol</option>
                        <option value="Comestibles">Comestibles</option>
                        <option value="Cigarros">Cigarros</option>
                        <option value="Golosinas">Golosinas</option>
                    </Form.Select>
                    <Form.Text className="text-danger">
                        {errors.categoria?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Stock*</Form.Label>
                    <Form.Control type="number" placeholder="Ingrese el stock" {
                        ...register('stock', {
                            required: 'El campo es obligatorio',
                        })
                        } />
                    <Form.Text className="text-danger">
                        {errors.stock?.message}
                    </Form.Text>

                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                    Editar
                </Button>
            </Form>
        </Container>
    );
};

export default EditarProducto;