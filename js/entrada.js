document.addEventListener("DOMContentLoaded", function() {
    crearEntrada();
});

function crearEntrada() {
    const createProductForm = document.querySelector('#createEntrada'); // Asegúrate de que el id del form sea correcto
    
    createProductForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del form
        
        // Captura el valor del nombre del producto desde el formulario
        const tipos_proveedores = e.target.tipos_proveedores.value; // Asegúrate de que el input del nombre tenga el atributo `name="productName"`
        
        const cantidad = e.target.cantidad.value;
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
        const year = today.getFullYear();
        const inputProducto = document.querySelector('input[name="producto"]');
        const productId = inputProducto.getAttribute('data-product-id');

        const formattedDate = `${day}/${month}/${year}`;

        console.log(tipos_proveedores, productId, cantidad, formattedDate)
        try {
            console.log("Creando proveedor...");
            
            const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado
            const url = 'http://localhost:3000/tico/v1/entries/create';

            // Realizar la solicitud POST con Axios
            const response = await axios.post(url, {
                suppliers_id: tipos_proveedores, 
                product_id: productId, 
                amount: cantidad, 
                date: formattedDate
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Pasar el Bearer Token en el header
                    'Content-Type': 'application/json' // Asegurarse de que el Content-Type sea JSON
                }
            });

            const data = response.data; // Obtener los datos de la respuesta
            console.log(data); // Ver la respuesta en la consola
            alert("Se agrego el proveedor.");

            // Redirigir al usuario después de crear el producto
            window.location.href = '/pages/admin/entradas.html';

        } catch (error) {
            // Si hay un error, mostrar una alerta o manejar el error
            alert("Error al crear el producto. Por favor, inténtalo de nuevo.");
            console.error("Error al intentar crear el producto:", error); // Imprime el error para depuración
        }
    });
}