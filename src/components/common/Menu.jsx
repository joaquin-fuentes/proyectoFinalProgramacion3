
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useState } from 'react';
import { FcBullish } from "react-icons/fc";


const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const [expand, setExpand] = useState(false);

  const navegacion = useNavigate()

  const logout = () => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Seguro que desea cerrar su sesion?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        //borrar del sessionstorage
        sessionStorage.removeItem("usuarioLogueado")
        setUsuarioLogueado({})
        navegacion("/")
        Swal.fire(
          'Listo!',
          'Sesion cerrada!',
          'success'
        )
      }
    })

  }


  const toggleExpand = () => {
    setExpand(false);
  };

  const handleNavLinkClick = () => {
    if (expand) {
      setExpand(false);
    }
  };

  return (
    <Navbar bg="success" expand="md" className="mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"} className="text-light"><FcBullish className="fs-1" /> VentaMax</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleExpand} />
        <Navbar.Collapse id="navbar-nav" className={expand ? "show" : ""}>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {
              usuarioLogueado.email ?
                <>
                  <NavLink end to={"/ventas"} className="nav-item nav-link text-light" onClick={handleNavLinkClick}>Ventas</NavLink>
                  <NavLink end to={"/compras"} className="nav-item nav-link text-light" onClick={handleNavLinkClick}>Compras</NavLink>
                  <NavLink end to={"/productos"} className="nav-item nav-link text-light" onClick={handleNavLinkClick}>Productos</NavLink>
                  <NavLink end to={"/resumen"} className="nav-item nav-link text-light" onClick={handleNavLinkClick}>Resumen</NavLink>
                  <Button variant="success" onClick={logout}>Salir</Button>

                </>
                :
                <NavLink end to={"/"} className="nav-item nav-link text-light" onClick={handleNavLinkClick}>Ingresar</NavLink>

            }


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;