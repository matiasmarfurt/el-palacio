<?php

require __DIR__ . "/../logs/log.php"; // Registro de errores

// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Manejar preflight OPTIONS
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

require __DIR__ . "/../controlador/productos.php"; // Controlador de productos

// Obtener el método HTTP de la solicitud
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {

    case "GET":
        // Buscar, obtener uno o listar todos
        if (isset($_GET['buscar'])) {
            buscarProductos($_GET['buscar']);
        } elseif (isset($_GET['id'])) {
            mostrarProducto($_GET['id']);
        } else {
            listarProductos();
        }
        break;

    case "POST":
        // Si viene un ID en formData → modificar, sino → crear
        if (!empty($_POST['id'])) {
            manejarModificacionProducto();
        } else {
            manejarCreacionProducto();
        }
        break;

    case "DELETE":
        // Eliminar producto
        $id = $_GET['id'] ?? null;

        if ($id) {
            eliminarProducto($id);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID no proporcionado en la URL"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
