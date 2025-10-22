const API_PRODUCTOS_CRUD = "../../backend/api/api_productos.php"; // URL base del endpoint para productos (API REST PHP)

window.onload = function () {
  listarProductos(); // Llama a la función para listar productos al cargar la página
};

let productos = []; // Variable array para almacenar los productos

// Obtener todos los productos (GET)
function listarProductos() {
  fetch(API_PRODUCTOS_CRUD)
    .then((res) => res.json())
    .then((data) => {
      productos = data;
      console.log("Productos:", data);
      mostrarTablaProductos(data);
    })
    .catch((err) => console.error("Error al obtener productos:", err));
}

// Función para mostrar la tabla de productos en el div 'productosContainer'
function mostrarTablaProductos(productos) {
  const container = document.getElementById("productosContainer");
  if (!Array.isArray(productos) || productos.length === 0) {
    container.innerHTML = "<p>No hay productos para mostrar.</p>";
    return;
  }

  let html = `
        <div class="table-container">
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>¿Eliminar?</th>
                        <th>¿Modificar?</th>
                    </tr>
                </thead>
                <tbody>
    `;

  productos.forEach((p) => {
    // Escapar comillas simples y dobles en los valores para evitar errores JS
    const nombre = String(p.nombre)
      .replace(/'/g, "\\'")
      .replace(/"/g, "&quot;");
    const descripcion = String(p.descripcion)
      .replace(/'/g, "\\'")
      .replace(/"/g, "&quot;");
    const categoria = String(p.categoria)
      .replace(/'/g, "\\'")
      .replace(/"/g, "&quot;");
    html += `
            <tr>
                <td data-label="ID">${p.id}</td>
                <td data-label="Nombre">${p.nombre}</td>
                <td data-label="Descripción">${p.descripcion}</td>
                <td data-label="Precio">${p.precio}</td>
                <td data-label="Categoria">${p.categoria}</td>
                <td data-label="¿Eliminar?">
                    <button onclick="eliminarProducto(${p.id})">Eliminar</button>
                </td>
                <td data-label="¿Modificar?">
                    <button onclick="
                        document.getElementById('formModificar').style.display='block';
                        document.getElementById('modificarId').value='${p.id}';
                        document.getElementById('modificarNombre').value='${nombre}';
                        document.getElementById('modificarDescripcion').value='${descripcion}';
                        document.getElementById('modificarPrecio').value='${p.precio}';
                        document.getElementById('modificarCategoria').value='${categoria}';
                    ">Modificar</button>
                </td>
            </tr>
        `;
  });

  html += `
                </tbody>
            </table>
        </div>
        <form id="formModificar" style="display:none;" onsubmit="enviarModificacion(event)">
            <input type="hidden" id="modificarId">
            <label>Nombre: <input type="text" id="modificarNombre" required></label>
            <label>Descripción: <input type="text" id="modificarDescripcion" required></label>
            <label>Precio: <input type="text" id="modificarPrecio" required></label>
            <label>Categoria: <input type="text" id="modificarCategoria" required></label>
            <button type="submit">Guardar</button>
        </form>
    `;

  container.innerHTML = html;
}

// Función para el submit del formulario de modificación de producto
function enviarModificacion(event) {
  event.preventDefault();
  const id = document.getElementById("modificarId").value;
  const nombre = document.getElementById("modificarNombre").value;
  const descripcion = document.getElementById("modificarDescripcion").value;
  const precio = document.getElementById("modificarPrecio").value;
  const categoria = document.getElementById("modificarCategoria").value;

  modificarProducto(id, nombre, descripcion, precio, categoria);
}

// Obtener un producto por ID (GET)
function mostrarProducto(id) {
  fetch(API_PRODUCTOS_CRUD + "?id=" + id)
    .then((res) => res.json())
    .then((data) => console.log("Producto:", data))
    .catch((err) => console.error("Error al obtener producto:", err));
}

// Agregar un producto nuevo (POST)
function agregarProducto(nombre, descripcion, precio, categoria) {
  fetch(API_PRODUCTOS_CRUD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion, precio, categoria }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Producto agregado:", data);
      listarProductos();
    })
    .catch((err) => console.error("Error al agregar producto:", err));
}

// Modificar un producto (PUT)
function modificarProducto(id, nombre, descripcion, precio, categoria) {
  fetch(API_PRODUCTOS_CRUD, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, nombre, descripcion, precio, categoria }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Producto modificado:", data);
      listarProductos();
    })
    .catch((err) => console.error("Error al modificar producto:", err));
}

// Eliminar un producto (DELETE)
function eliminarProducto(id) {
  fetch(API_PRODUCTO_CRUD + "?id=" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Producto eliminado:", data);
      listarProductos();
    })
    .catch((err) => console.error("Error al eliminar producto:", err));
}

// Buscar productos por nombre (GET)
function buscarProductos(texto) {
  fetch(API_PRODUCTOS_CRUD + "?buscar=" + encodeURIComponent(texto))
    .then((res) => res.json())
    .then((data) => {
      mostrarTablaProductos(data);
    })
    .catch((err) => console.error("Error al buscar productos:", err));
}

document
  .getElementById("buscadorProductos")
  .addEventListener("input", function () {
    const texto = this.value.trim();
    if (texto === "") {
      listarProductos();
    } else {
      buscarProductos(texto);
    }
  });
