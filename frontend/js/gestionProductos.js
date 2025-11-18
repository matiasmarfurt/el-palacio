const API_PRODUCTOS_CRUD = "../../backend/api/api_productos.php"; // URL base del endpoint para productos (API REST PHP)

let productos = [];

// Listar todos los productos (GET)
function listarProductos() {
  fetch(API_PRODUCTOS_CRUD)
    .then((res) => res.json())
    .then((data) => {
      productos = data;
      console.log("Productos obtenidos:", data);
      mostrarTablaProductos(data);
    })
    .catch((err) => console.error("Error al obtener productos:", err));
}

function agregarProductoDesdeFormulario() {
  const nombre = document.getElementById("nombreProducto").value.trim();
  const categoria = document.getElementById("categoriaProducto").value.trim();
  const descripcion = document.getElementById("descripcionProducto").value.trim();
  const precio = document.getElementById("precioProducto").value.trim();
  const imagenInput = document.getElementById("imagenProducto");

  // Si el usuario subió una imagen → usar FormData
  if (imagenInput.files.length > 0) {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("categoria", categoria);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("imagen", imagenInput.files[0]);

    agregarProductoConImagen(formData);
    return;
  }

  // Si no hay imagen → JSON normal
  agregarProducto(nombre, descripcion, precio, categoria);
}

// Mostrar tabla de productos
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
                        document.getElementById('imagenActual').src='../../backend/img/${p.imagen}';
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

    <label>Nombre:
        <input type="text" id="modificarNombre" required>
    </label>

    <label>Descripción:
        <input type="text" id="modificarDescripcion" required>
    </label>

    <label>Precio:
        <input type="number" id="modificarPrecio" required>
    </label>

    <label>Categoría:
        <input type="text" id="modificarCategoria" required>
    </label>

    <label>Imagen actual:</label>
    <img id="imagenActual" width="120" style="display:block; margin-bottom:10px; border-radius:6px">

    <label>Nueva imagen (opcional):
        <input type="file" id="modificarImagen" accept="image/*">
    </label>

    <button type="submit">Guardar</button>
</form>

    `;

  container.innerHTML = html;
}

// Submit de modificación
function enviarModificacion(event) {
  event.preventDefault();
  const id = document.getElementById("modificarId").value;
  const nombre = document.getElementById("modificarNombre").value;
  const descripcion = document.getElementById("modificarDescripcion").value;
  const precio = document.getElementById("modificarPrecio").value;
  const categoria = document.getElementById("modificarCategoria").value;

  modificarProducto(id, nombre, descripcion, precio, categoria);
}

// Mostrar producto por ID
function mostrarProducto(id) {
  fetch(`${API_PRODUCTOS_CRUD}?id=${id}`)
    .then((res) => res.json())
    .then((data) => console.log("Producto obtenido:", data))
    .catch((err) => console.error("Error al obtener producto:", err));
}

// Agregar producto con imagen (POST)
function agregarProductoConImagen(formData) {
  console.log("Enviando producto con imagen...");
  for (const pair of formData.entries()) {
    console.log(pair[0], ":", pair[1]);
  }

  fetch(API_PRODUCTOS_CRUD, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      console.log("Respuesta recibida, status:", res.status);
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        console.log("Producto agregado con imagen:", data);
        alert("Producto agregado exitosamente");
        listarProductos();
      }
    })
    .catch((err) => {
      console.error("Error al agregar producto:", err);
      alert("Error al agregar producto: " + err.message);
    });
}

// Agregar producto nuevo sin imagen (POST)
function agregarProducto(nombre, descripcion, precio, categoria) {
  console.log("Agregando producto sin imagen...");
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

// Modificar producto (PUT)
function modificarProducto(id, nombre, descripcion, precio, categoria) {
  console.log("Modificando producto ID:", id);
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

// Eliminar producto (DELETE)
function eliminarProducto(id) {
  console.log("Eliminando producto ID:", id);
  fetch(`${API_PRODUCTOS_CRUD}?id=${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Producto eliminado:", data);
      listarProductos();
    })
    .catch((err) => console.error("Error al eliminar producto:", err));
}

// Buscar productos por texto (GET)
function buscarProductos(texto) {
  console.log("Buscando productos:", texto);
  fetch(`${API_PRODUCTOS_CRUD}?buscar=${encodeURIComponent(texto)}`)
    .then((res) => res.json())
    .then((data) => mostrarTablaProductos(data))
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
