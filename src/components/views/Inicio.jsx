import React from 'react';
import { Container, Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"


const Inicio = () => {
    return (
        <Container className='main my-3 text-center'>
            <h2 className='mb-4'>Bienvenido al Sistema de ventas de "VentaMax"</h2>
            <div className="d-grid gap-2">
                <NavLink  to={"/ventas"} className={"mt-2 btn btn-size-lg btn-outline-success"} >VENTAS</NavLink>
                <NavLink  to={"/compras"} className={"mt-2 btn btn-size-lg btn-outline-success"} >COMPRAS</NavLink>
                <NavLink  to={"/productos"} className={"mt-2 btn btn-size-lg btn-outline-success"} >PRODUCTOS</NavLink>
                <NavLink  to={"/resumen"} className={"mt-2 btn btn-size-lg btn-outline-success"} >RESUMEN</NavLink>
            </div>
        </Container>
    );
};

export default Inicio;