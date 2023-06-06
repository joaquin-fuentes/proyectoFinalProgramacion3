
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useState } from 'react';
import { FcBullish } from "react-icons/fc";


const Menu = () => {
  const [expand, setExpand] = useState(false);

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
        <Navbar.Brand as={Link} to={"/"} className="text-light"><FcBullish className="fs-1"/> VentaMax</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleExpand} />
        <Navbar.Collapse id="navbar-nav" className={expand ? "show" : ""}>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <NavLink end to={"/ventas"} className="nav-item nav-link text-light" onClick={handleNavLinkClick}>Ventas</NavLink>
            <NavLink end to={"/compras"} className="nav-item nav-link text-light" onClick={handleNavLinkClick}>Compras</NavLink>
            <NavLink end to={"/productos"} className="nav-item nav-link text-light" onClick={handleNavLinkClick}>Productos</NavLink>
            <NavLink end to={"/resumen"} className="nav-item nav-link text-light" onClick={handleNavLinkClick}>Resumen</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;