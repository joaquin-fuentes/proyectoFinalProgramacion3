import { Container, Nav, Navbar, Offcanvas, NavDropdown, Form, Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

const Menu = () => {
    return (
        // <Navbar bg="success" variant="dark">
        //     <Container>
        //         <Navbar.Brand as={Link} to={"/"}>Logo negocio + nombre</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="ms-auto">
        //                 <NavLink end to={"/"} className={"nav-item nav-link"}>Ventas</NavLink>
        //                 <NavLink end to={"/"} className={"nav-item nav-link"}>Compras</NavLink>
        //                 <NavLink end to={"/"} className={"nav-item nav-link"}>Productos</NavLink>
        //                 <NavLink end to={"/"} className={"nav-item nav-link"}>Resumen</NavLink>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
        <>
            {[ 'md'].map((expand) => (
                <Navbar key={expand} bg="success" expand={expand} className="mb-1 text-primary">
                    <Container fluid>
                        <Navbar.Brand as={Link} to={"/"} className="text-light">Logo negocio + nombre</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                        className="bg-success"
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                <Navbar.Brand as={Link} to={"/"} className="text-light">Logo negocio + nombre</Navbar.Brand>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <NavLink end to={"/ventas"} className={"nav-item nav-link text-light"}>Ventas</NavLink>
                                    <NavLink end to={"/compras"} className={"nav-item nav-link text-light"}>Compras</NavLink>
                                    <NavLink end to={"/"} className={"nav-item nav-link text-light"}>Productos</NavLink>
                                    <NavLink end to={"/"} className={"nav-item nav-link text-light"}>Resumen</NavLink>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
};

export default Menu;