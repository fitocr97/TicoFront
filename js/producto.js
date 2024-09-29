document.addEventListener("DOMContentLoaded", function() {
    crearProducto();
});

function crearProducto() {
    const createProductForm = document.querySelector('#createProduct'); // Asegúrate de que el id del form sea correcto
    
    createProductForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del form
        
        // Captura el valor del nombre del producto desde el formulario
        const name = e.target.name.value; // Asegúrate de que el input del nombre tenga el atributo `name="productName"`
        console.log(name)
        try {
            console.log("Creando producto...");
            
            const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado
            const url = 'http://localhost:3000/tico/v1/products/create';

            // Realizar la solicitud POST con Axios
            const response = await axios.post(url, {
                name: name // Enviar el nombre del producto
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Pasar el Bearer Token en el header
                    'Content-Type': 'application/json' // Asegurarse de que el Content-Type sea JSON
                }
            });

            const data = response.data; // Obtener los datos de la respuesta
            console.log(data); // Ver la respuesta en la consola
            alert("Se agrego el producto.");

            // Redirigir al usuario después de crear el producto
            window.location.href = '/pages/admin/productos.html';

        } catch (error) {
            // Si hay un error, mostrar una alerta o manejar el error
            alert("Error al crear el producto. Por favor, inténtalo de nuevo.");
            console.error("Error al intentar crear el producto:", error); // Imprime el error para depuración
        }
    });
}