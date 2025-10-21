<?php

require_once __DIR__ . "/../config/conexion.php"; // Importar la conexión a la base de datos

// Definición de la clase Usuario que interactúa con la tabla 'usuario' en la base de datos
class Usuario
{
    private $conn; // Propiedad para almacenar la conexión mysqli

    // Constructor que recibe la conexión a la base de datos y la asigna a $this->conn
    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function obtenerTodos()
    {
        $query = "SELECT id_usuario, nombre_usuario, apellido_usuario, email, tipo FROM usuario";
        $result = $this->conn->query($query);
        
        $usuarios = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $usuarios[] = $row;
            }
        }
        
        return $usuarios;
    }

    // Método para registrar un nuevo usuario
    public function registrar($nombre_usuario, $apellido_usuario, $email, $tipo, $password)
    {
        // Hashear la contraseña antes de guardarla
        $hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $this->conn->prepare(
            "INSERT INTO usuario (nombre_usuario, apellido_usuario, email, tipo, password) VALUES (?, ?, ?, ?, ?)"
        );

        if (!$stmt) {
            return [
                "success" => false,
                "message" => "Error al preparar la consulta",
                "error" => $this->conn->error
            ];
        }

        // Bindear parámetros (s = string)
        $stmt->bind_param('sssss', $nombre_usuario, $apellido_usuario, $email, $tipo, $hash);

        if ($stmt->execute()) {
            return [
                "success" => true,
                "message" => "Registro exitoso, ¡bienvenido $nombre_usuario!",
                "insert_id" => $stmt->insert_id
            ];
        } else {
            return [
                "success" => false,
                "message" => "No se pudo registrar el usuario",
                "error" => $stmt->error
            ];
        }
    }

    // Método para obtener usuario por email o nombre y verificar contraseña
    public function logear($usuario, $password)
    {
        // Buscar al usuario por email o nombre (solo un registro esperado)
        $stmt = $this->conn->prepare("SELECT * FROM usuario WHERE email = ? OR nombre_usuario = ? LIMIT 1");
        if (!$stmt) {
            error_log("[Usuario::logear] Error en prepare: " . $this->conn->error);
            return null;
        }

        $stmt->bind_param('ss', $usuario, $usuario);
        if (!$stmt->execute()) {
            error_log("[Usuario::logear] Error en execute: " . $stmt->error);
            return null;
        }

        $resultado = $stmt->get_result()->fetch_assoc();

        // Si no hay usuario, retornar null
        if (!$resultado) {
            return null;
        }

        $stored = $resultado['password'];

        // Caso 1: la contraseña almacenada está hasheada y coincide
        if (password_verify($password, $stored)) {
            // Si el hash necesita rehash, actualizar en background
            if (password_needs_rehash($stored, PASSWORD_DEFAULT)) {
                $newHash = password_hash($password, PASSWORD_DEFAULT);
                $this->actualizarPasswordPorId($resultado['id_usuario'], $newHash);
            }

            unset($resultado['password']);
            return $resultado;
        }

        // Caso 2: migración — la contraseña en la BBDD está en texto plano y coincide exactamente
        if ($stored === $password) {
            $newHash = password_hash($password, PASSWORD_DEFAULT);
            // Intentar actualizar el password al hash; si falla, igual devolvemos el usuario autenticado
            $this->actualizarPasswordPorId($resultado['id_usuario'], $newHash);

            unset($resultado['password']);
            return $resultado;
        }

        // No coincide
        return null;
    }

    // Método privado para actualizar el password (hash) por id de usuario
    private function actualizarPasswordPorId($idUsuario, $newHash)
    {
        $stmt = $this->conn->prepare("UPDATE usuario SET password = ? WHERE id_usuario = ?");
        if (!$stmt) {
            error_log("[Usuario::actualizarPasswordPorId] Error en prepare: " . $this->conn->error);
            return false;
        }

        $stmt->bind_param('si', $newHash, $idUsuario);
        if (!$stmt->execute()) {
            error_log("[Usuario::actualizarPasswordPorId] Error en execute: " . $stmt->error);
            return false;
        }

        return true;
    }
}
