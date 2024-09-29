document.addEventListener("DOMContentLoaded", function() {
    crearProveedor();
});

function crearProveedor() {
    const createProductForm = document.querySelector('#createPrveedor'); // Asegúrate de que el id del form sea correcto
    
    createProductForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del form
        
        // Captura el valor del nombre del producto desde el formulario
        const name = e.target.name.value; // Asegúrate de que el input del nombre tenga el atributo `name="productName"`
        const type = e.target.tipo.value;
        const product_id = e.target.producto_id.value;
        const location = e.target.location.value;
        const contact = e.target.contacto.value;
        const phone = e.target.telefono.value;

        console.log(name, type, product_id, location, contact, phone)
        try {
            console.log("Creando proveedor...");
            
            const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado
            const url = 'http://localhost:3000/tico/v1/suppliers/create';

            // Realizar la solicitud POST con Axios
            const response = await axios.post(url, {
                name:name, 
                type:type,
                product_id:product_id,
                location:location, 
                contact_name:contact, 
                phone:phone
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
            window.location.href = '/pages/admin/proveedores.html';

        } catch (error) {
            // Si hay un error, mostrar una alerta o manejar el error
            alert("Error al crear el producto. Por favor, inténtalo de nuevo.");
            console.error("Error al intentar crear el producto:", error); // Imprime el error para depuración
        }
    });
}