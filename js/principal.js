// Función que se ejecuta al presionar el botón de cerrar sesión
function cerrarSesion() {
    const tipoDocumento = localStorage.getItem('tipoDocumento');
    const numeroDocumento = localStorage.getItem('numeroDocumento');

    // Verifica que ambos valores existen
    if (!tipoDocumento || !numeroDocumento) return; // Sale si faltan datos

    fetch('http://localhost:8081/autenticacion/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipoDocumento, numeroDocumento })
    })
    .then(response => {
        if (response.ok) {
            localStorage.clear(); // Limpia localStorage
            window.location.href = 'index.html'; // Redirige a index.html
        }
    })
    .catch(console.error); // Maneja errores
}

// Vincula el evento al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    btnCerrarSesion?.addEventListener('click', cerrarSesion); // Usa el operador opcional
});







window.addEventListener('load', function(){

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');

    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';

}