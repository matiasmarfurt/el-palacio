// Datos de contacto del restaurante
const datosContacto = {
  whatsapp: {
    numero: "598XXXXXXXXX", // Reemplazar con número real
    nombre: "El Palacio",
    icono: "📱",
  },
  instagram: {
    usuario: "@elpalacio",
    url: "https://instagram.com/elpalacio",
    icono: "📷",
  },
  telefono: "4522 9753",
  email: "reservas@elpalacio.com",
}

// Función para inicializar el widget
function inicializarWidgetAyuda() {
  const widget = document.getElementById("widget-ayuda-flotante")
  const botonFlotante = document.getElementById("boton-ayuda-flotante")
  const cerrarWidget = document.getElementById("cerrar-widget-ayuda")

  if (!botonFlotante || !widget) return

  // Abrir widget al hacer clic en el botón flotante
  botonFlotante.addEventListener("click", () => {
    widget.classList.add("abierto")
    botonFlotante.style.display = "none"
  })

  // Cerrar widget al hacer clic en el botón de cerrar
  cerrarWidget.addEventListener("click", () => {
    widget.classList.remove("abierto")
    botonFlotante.style.display = "flex"
  })

  // Cerrar widget al hacer clic fuera de él
  document.addEventListener("click", (event) => {
    if (!widget.contains(event.target) && !botonFlotante.contains(event.target)) {
      if (widget.classList.contains("abierto")) {
        widget.classList.remove("abierto")
        botonFlotante.style.display = "flex"
      }
    }
  })
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", inicializarWidgetAyuda)
