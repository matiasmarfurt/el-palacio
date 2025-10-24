<?php
require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../modelo/usuario.php';
session_start();

$usuarioModel = new Usuario($conn);

function listarUsuarios()
{
    global $usuarioModel;
    $usuarios = $usuarioModel->obtenerTodos();
    echo json_encode([
        "success" => true,
        "usuarios" => $usuarios
    ]);
}

function registrarUsuario($nombre_usuario, $apellido_usuario, $email, $tipo, $password)
{
    global $usuarioModel;
    $resultado = $usuarioModel->registrar($nombre_usuario, $apellido_usuario, $email, $tipo, $password);
    echo json_encode($resultado);
}
function loginUsuario($usuario, $password)
{
    global $usuarioModel;
    $resultado = $usuarioModel->logear($usuario, $password);

    if ($resultado) {
        // Guardar info en sesión
        $_SESSION['usuario_id'] = $resultado['id_usuario'];
        $_SESSION['usuario_tipo'] = $resultado['tipo'];

        echo json_encode(["success" => true, "usuario" => $resultado]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Usuario o contraseña incorrectos"]);
    }
}

function logoutUsuario()
{
    session_start();
    session_unset();
    session_destroy();
    echo json_encode(["success" => true, "message" => "Sesión cerrada correctamente"]);
}
