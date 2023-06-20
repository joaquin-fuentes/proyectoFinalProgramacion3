// llamar a la variable de entorno
const URL_USUARIO = import.meta.env.VITE_API_USUARIO
const URL_PRODUCTO = import.meta.env.VITE_API_PRODUCTO
const URL_COMPRA = import.meta.env.VITE_API_COMPRA
const URL_VENTA = import.meta.env.VITE_API_VENTA


// USUARIOS
export const login = async (usuario)=>{
    
    console.log(usuario)
    try {
        const respuesta = await fetch(URL_USUARIO);
        const listaUsuarios = await respuesta.json();
        console.log(listaUsuarios)
        //buscar si algun usuario coincide con el que recibi por parametros
        const usuarioBuscado = listaUsuarios.find((itemUsuario)=>itemUsuario.email === usuario.email);
        if(usuarioBuscado){
            console.log("email encontrado")
            //verificar el password
            if(usuarioBuscado.password === usuario.password){
                console.log("encontramos al usuario")
                return usuarioBuscado
            } else {
                console.log("password incorrecto")
                return null
            }
        } else {
            console.log("email incorrecto")
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}


// PRODUCTOS 

export const obtenerProductos = async ()=>{
    try {
        const respuesta = await fetch(URL_PRODUCTO)
        const listaProductos = await respuesta.json()
        return listaProductos

    } catch (error) {
        console.log(error)
        return null
    }
}
export const obtenerProducto = async (id)=>{
    try {
        const respuesta = await fetch(`${URL_PRODUCTO}/${id}`)
        const productoEditar = await respuesta.json()
        return productoEditar

    } catch (error) {
        console.log(error)
        return null
    }
}

export const consultaBorrarProducto = async (id)=>{
    try {
        const respuesta = await fetch(`${URL_PRODUCTO}/${id}` , {
            method:"DELETE"
        });
        // const listaProductos = await respuesta.json()
        return respuesta

    } catch (error) {
        console.log(error)
        return null
    }
}

export const consultaCrearProducto = async (producto)=>{
    try {
        const respuesta = await fetch(URL_PRODUCTO, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(producto)
        });
        return respuesta

    } catch (error) {
        console.log(error)
        return null
    }
}

export const consultaEditarProducto = async (producto, id)=>{
    try {
        const respuesta = await fetch(URL_PRODUCTO+"/"+id, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(producto)
        });
        return respuesta

    } catch (error) {
        console.log(error)
        return null
    }
}

// VENTAS

export const obtenerVentas = async ()=>{
    try {
        const respuesta = await fetch(URL_VENTA)
        const listaVentas = await respuesta.json()
        return listaVentas

    } catch (error) {
        console.log(error)
        return null
    }
}
export const obtenerVenta = async (id)=>{
    try {
        const respuesta = await fetch(`${URL_VENTA}/${id}`)
        const ventaEditar = await respuesta.json()
        return ventaEditar

    } catch (error) {
        console.log(error)
        return null
    }
}

export const consultaBorrarVenta = async (id)=>{
    try {
        const respuesta = await fetch(`${URL_VENTA}/${id}` , {
            method:"DELETE"
        });
        return respuesta

    } catch (error) {
        console.log(error)
        return null
    }
}

export const consultaCrearVenta = async (venta)=>{
    try {
        const respuesta = await fetch(URL_VENTA, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(venta)
        });
        return respuesta

    } catch (error) {
        console.log(error)
        return null
    }
}

export const consultaEditarVenta = async (venta, id)=>{
    try {
        const respuesta = await fetch(URL_VENTA+"/"+id, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(venta)
        });
        return respuesta

    } catch (error) {
        console.log(error)
        return null
    }
}