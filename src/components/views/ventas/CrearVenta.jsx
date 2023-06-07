import { Button, Form, Container } from "react-bootstrap"
import { useForm } from "react-hook-form";


const CrearVenta = () => {

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
        <Container className="my-4">
            <h2>Nueva Venta</h2>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" {
                        ...register('fechaVenta', {
                            required: 'El campo es obligatorio',
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.fechaVenta?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre Cliente</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese aqui el nombre del cliente" maxLength={50} {
                        ...register('nombreCliente', {
                            required: 'El campo es obligatorio',
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.nombreCliente?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Importe</Form.Label>
                    <Form.Control type="number" placeholder="Importe de la venta" {
                        ...register('importeVenta', {
                            required: 'El campo es obligatorio',
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.importeVenta?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Vendedor</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el nombr de del Vendedor" maxLength={50} {
                        ...register('nombreVendedor', {
                            required: 'El campo es obligatorio',
                        })
                        } />
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