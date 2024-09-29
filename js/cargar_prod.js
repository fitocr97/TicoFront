document.addEventListener("DOMContentLoaded", function() {
    cargarProductos();
});

async function cargarProductos() {
    try {
        const token = localStorage.getItem('token'); // Asegúrate de tener el token almacenado
        const url = 'http://localhost:3000/tico/v1/products/'; // Cambia esta URL por la correcta
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const productos = response.data.msg; // Asumiendo que la respuesta tiene un array de productos
        const selectProductos = document.querySelector('#tipos_productos');

        // Limpiar el select antes de agregar los productos
        selectProductos.innerHTML = '';

        // Iterar sobre los productos y agregarlos como opciones al select
        productos.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.pid; // Usar el id del producto como valor
            option.textContent = producto.name; // Mostrar el nombre del producto en la opción
            selectProductos.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        alert("Hubo un error al cargar los productos. Intenta de nuevo.");
    }
}
