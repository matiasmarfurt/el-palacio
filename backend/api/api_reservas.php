<?php

require __DIR__ . "/../logs/log.php";

// Habilitar CORS para permitir peticiones desde el frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Asegurar que las respuestas serán JSON
header("Content-Type: application/json; charset=utf-8");

// Manejar preflight OPTIONS
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    echo json_encode(["ok" => true]);
    exit();
}

require_once __DIR__ . "/../controlador/reservas.php";

// Obtener el método de la solicitud HTTP
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Si se pasa ?listar=1 devolver todas las reservas
    if (isset($_GET['listar'])) {
        listarReservas();
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Falta parámetro o ruta no soportada"]);
    }
} elseif ($method == 'POST') {
    // Leer JSON del body
    $data = json_decode(file_get_contents('php://input'), true);
    // Tolerar envío por form-data (POST clásico)
    if (!$data) {
        $data = $_POST;
    }

    // Validación básica en el API (complementaria a la del controlador)
    if (empty($data['nombre']) || empty($data['email']) || empty($data['telefono'])
        || empty($data['personas']) || empty($data['fecha']) || empty($data['hora'])) {
        http_response_code(400);
        echo json_encode(["error" => "Faltan campos obligatorios"]);
        exit();
    }

    // Delegar la creación al controlador
    crearReserva(
        $data['nombre'] ?? '',
        $data['email'] ?? '',
        $data['telefono'] ?? '',
        $data['personas'] ?? '',
        $data['fecha'] ?? '',
        $data['hora'] ?? '',
        $data['comentarios'] ?? ''
    );
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
