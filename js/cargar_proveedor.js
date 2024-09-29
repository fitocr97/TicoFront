document.addEventListener("DOMContentLoaded", function() {
    cargarProveedoresYProductos(); // Carga los proveedores y los productos cuando la página carga
});

let productos = []; // Aquí se almacenarán los productos
let proveedores = []; // Aquí se almacenarán los proveedores

// Función para cargar los proveedores y los productos
async function cargarProveedoresYProductos() {
    try {
        const token = localStorage.getItem('token');
        
        // Cargar proveedores
        const urlProveedores = 'http://localhost:3000/tico/v1/suppliers/'; // Cambia esta URL por la correcta
        const responseProveedores = await axios.get(urlProveedores, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        proveedores = responseProveedores.data.msg;; // Almacena los proveedores

        // Cargar productos
        const urlProductos = 'http://localhost:3000/tico/v1/products/'; // Cambia esta URL por la correcta
        const responseProductos = await axios.get(urlProductos, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        productos = responseProductos.data.msg; // Almacena los productos


        // Llenar el select de proveedores
        const selectProveedores = document.querySelector('#tipos_proveedores');
        selectProveedores.innerHTML = ''; // Limpiar el select

        proveedores.forEach(proveedor => {
            const option = document.createElement('option');
            option.value = proveedor.sid; // Usa el id del proveedor como valor
            option.textContent = proveedor.name; // Muestra el nombre del proveedor
            selectProveedores.appendChild(option);
        });

        // Agregar el evento change para seleccionar proveedor
        selectProveedores.addEventListener('change', cargarProductoRelacionado);

    } catch (error) {
        console.error("Error al cargar los proveedores y productos:", error);
        alert("Hubo un error al cargar los datos. Intenta de nuevo.");
    }
}

// Función para cargar el producto relacionado al proveedor seleccionado
function cargarProductoRelacionado(event) {
    const proveedorId = event.target.value; // Obtener el id del proveedor seleccionado
    console.log("id prove: "+ proveedorId); // Para depuración
    console.log(proveedores)

    let productName= null; // Inicializar variable para almacenar el product_id

    // Buscar el proveedor seleccionado en el array de proveedores
    for (let i = 0; i < proveedores.length; i++) {
        if (String(proveedores[i].sid) === String(proveedorId)) {
            productName = proveedores[i].product_name; // Obtener el product_id asociado
            break;
        }
    }


    if (productName) {
        // Buscar el ID del producto en el array de productos usando el nombre del producto
        let productId = null; // Inicializar variable para almacenar el ID del producto
        for (let j = 0; j < productos.length; j++) {
            if (productos[j].name === productName) { // Comparar el nombre del producto
                productId = productos[j].pid; // Obtener el ID del producto
                break; // Salir del bucle una vez que encontramos el producto
            }
        }

        if (productId) {
            // Asignar el ID del producto al input
            const inputProducto = document.querySelector('input[name="producto"]');
            inputProducto.value = productName; // Asignar el ID del producto como value al input
            inputProducto.setAttribute('data-product-id', productId);
            inputProducto.disabled = true; // Mantener el input deshabilitado
        } else {
            alert("No se encontró el producto asociado a este proveedor.");
        }
    } else {
        alert("Proveedor no tiene un producto asociado.");
    }
}