const API_RESERVAS = "../../backend/api/api_reservas.php"; // URL base del endpoint para reservas

// Cargar reservas al iniciar la página
window.onload = function() {
    if (document.getElementById('reservasContainer')) {
        listarReservas();
    }
};

let reservas = []; // Array para almacenar las reservas

// Obtener todas las reservas (GET)
function listarReservas() {
    fetch(API_RESERVAS)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                reservas = data.reservas;
                console.log("Reservas:", reservas);
                mostrarTablaReservas(reservas);
            } else {
                throw new Error(data.error || 'Error al obtener reservas');
            }
        })
        .catch(err => {
            console.error("Error al obtener reservas:", err);
            mostrarError("No se pudieron cargar las reservas");
        });
}

// Crear nueva reserva (POST)
function crearReserva(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const formData = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('pais').value.trim() + " " + document.getElementById('telefono').value.trim(),
        personas: parseInt(document.getElementById('personas').value),
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        comentarios: document.getElementById('comentarios').value.trim()
    };

    // Validaciones
    if (!formData.nombre || !formData.email || !formData.telefono || 
        !formData.personas || !formData.fecha || !formData.hora) {
        mostrarError("Por favor, complete todos los campos obligatorios");
        return;
    }

    if (!validarEmail(formData.email)) {
        mostrarError("Por favor, ingrese un email válido");
        return;
    }

    fetch(API_RESERVAS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            mostrarMensaje("¡Reserva realizada con éxito! Te contactaremos para confirmar.");
            document.getElementById('formReserva').reset();
        } else {
            throw new Error(data.error || 'No se pudo procesar la reserva');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarError("Hubo un problema al procesar tu reserva. Por favor, intenta nuevamente.");
    });
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Eliminar reserva (DELETE)
function eliminarReserva(id) {
    if (!confirm('¿Está seguro de cancelar esta reserva?')) return;

    fetch(`${API_RESERVAS}?id=${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            mostrarMensaje("Reserva cancelada con éxito");
            listarReservas();
        } else {
            throw new Error(data.error || 'Error al cancelar la reserva');
        }
    })
    .catch(err => {
        console.error("Error al eliminar reserva:", err);
        mostrarError("No se pudo cancelar la reserva");
    });
}

// Funciones para mostrar mensajes al usuario
function mostrarMensaje(mensaje) {
    const alertaDiv = document.createElement('div');
    alertaDiv.className = 'alert alert-success';
    alertaDiv.textContent = mensaje;
    
    const container = document.querySelector('#reservas .container');
    if (container) {
        container.insertBefore(alertaDiv, container.firstChild);
        setTimeout(() => alertaDiv.remove(), 5000);
    }
}

function mostrarError(mensaje) {
    const alertaDiv = document.createElement('div');
    alertaDiv.className = 'alert alert-danger';
    alertaDiv.textContent = mensaje;
    
    const container = document.querySelector('#reservas .container');
    if (container) {
        container.insertBefore(alertaDiv, container.firstChild);
        setTimeout(() => alertaDiv.remove(), 5000);
    }
}

// Event Listeners
document.getElementById('formReserva')?.addEventListener('submit', crearReserva);
document.addEventListener('DOMContentLoaded', () => {
    const formReserva = document.getElementById('formReserva');
    if (formReserva) {
        formReserva.addEventListener('submit', crearReserva);
    }
});
