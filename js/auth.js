
// Función para verificar si el token existe en localStorage
function checkAuthToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("No tienes acceso. Por favor, inicia sesión.");
        window.location.href = '/login.html';
    } else {
        console.log("Acceso concedido, token encontrado.");
    }
}