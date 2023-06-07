import { Button, Form, Container } from "react-bootstrap"
import { useForm } from "react-hook-form";


const CrearCompra = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset
    } = useForm();

    const onSubmit = () => {
        console.log("paso la validacion")
    }

    return (
        <Container className="main my-4">
            <h2>Nueva Compra</h2>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" {
                        ...register('fechaCompra', {
                            required: 'El campo es obligatorio',
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.fechaCompra?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Proveedor</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese aqui el nombre del cliente" maxLength={50} {
                        ...register('proveedor', {
                            required: 'El campo es obligatorio',
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.proveedor?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Importe</Form.Label>
                    <Form.Control type="number" placeholder="Importe de la venta" {
                        ...register('importeCompra', {
                            required: 'El campo es obligatorio',
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.importeCompra?.message}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                    Comprar
                </Button>
            </Form>
        </Container>
    );
};

export default CrearCompra;