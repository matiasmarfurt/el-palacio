<?php
session_start();

function requireAuth($type = "public")
{
    if (!isset($_SESSION['usuario_id'])) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "error" => "No autenticado"
        ]);
        exit();
    }

    if ($type === "admin" && $_SESSION['usuario_tipo'] !== "admin") {
        http_response_code(403);
        echo json_encode([
            "success" => false,
            "error" => "Acceso denegado. Solo administradores."
        ]);
        exit();
    }
}
