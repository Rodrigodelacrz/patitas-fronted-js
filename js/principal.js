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
}window.addEventListener('load', function () {
    // Referenciar controles de pantalla
    const msgSuccess = document.getElementById('msgSuccess');
    const msgError = document.getElementById('msgError');
    const logoutBtn = document.getElementById('logoutBtn');

    // Función para mostrar mensajes en la UI
    function mostrarMensaje(mensaje, esExito) {
        if (esExito) {
            msgSuccess.innerHTML = mensaje;
            msgSuccess.style.display = 'block';
            msgError.style.display = 'none';
        } else {
            msgError.innerHTML = mensaje;
            msgError.style.display = 'block';
            msgSuccess.style.display = 'none';
        }
    }

    // Manejar el clic del botón de logout
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Recuperar los datos del usuario
        const result = JSON.parse(localStorage.getItem('result'));
        if (!result) {
            mostrarMensaje('Error: No se encontraron datos de usuario.', false);
            return;
        }

        const logoutRequest = {
            tipoDocumento: result.tipoDocumento,
            numeroDocumento: result.numeroDocumento
        };

        // Llamar al API de logout
        fetch('http://localhost:8082/logout/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logoutRequest)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            // Verificar el código de respuesta
            if (data.codigo === '00') {
                mostrarMensaje('Logout exitoso: ' + data.mensaje, true);
                localStorage.removeItem('result'); // Eliminar datos del almacenamiento
                // Redirigir a la página de inicio o login después del logout exitoso
                setTimeout(() => {
                    window.location.href = '/login.html';
                }, 2000);
            } else {
                mostrarMensaje('Error en el logout: ' + data.mensaje, false);
            }
        })
        .catch(error => {
            mostrarMensaje('Error al conectar con el servidor: ' + error.message, false);
        });
    });
});
