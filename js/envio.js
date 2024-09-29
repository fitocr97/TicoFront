document.addEventListener("DOMContentLoaded", function() {
    crearEntrada();
});

function crearEntrada() {
    const createProductForm = document.querySelector('#createEnvio'); // Asegúrate de que el id del form sea correcto
    
    createProductForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del form
        
        // Captura el valor del nombre del producto desde el formulario
        //const tipos_proveedores = e.target.tipos_proveedores.value; // Asegúrate de que el input del nombre tenga el atributo `name="productName"`
        const contenedor = e.target.contenedor.value;
        const producto_id = e.target.producto_id.value;
        const cantidad = e.target.cantidad.value;
        const lugar = e.target.lugar.value;
    
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
        const year = today.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        console.log(formattedDate, lugar, producto_id, contenedor, cantidad)
        try {
            console.log("Creando proveedor...");
            
            const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado
            const url = 'https://ticoapi-production.up.railway.app/tico/v1/shipments/create';

            // Realizar la solicitud POST con Axios
            const response = await axios.post(url, {
                container: contenedor,
                product_id: producto_id,
                amount: cantidad,
                departure_date: formattedDate,
                location: lugar
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
            window.location.href = '/pages/admin/envios.html';

        } catch (error) {
            // Si hay un error, mostrar una alerta o manejar el error
            alert("Error al crear el producto. Por favor, inténtalo de nuevo.");
            console.error("Error al intentar crear el producto:", error); // Imprime el error para depuración
        }
    });
}