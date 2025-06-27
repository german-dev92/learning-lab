<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se aceptó la política de privacidad
    if (!isset($_POST['consentimiento'])) {
        $error = "Debes aceptar la política de privacidad.";
    }

    // Validar y limpiar los datos
    $nombre = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $mensaje = htmlspecialchars(trim($_POST['mensaje'] ?? ''));

    if (empty($nombre) || empty($email) || empty($mensaje)) {
        $error = "Todos los campos son obligatorios.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "El correo electrónico no es válido.";
    }

    // Si no hubo errores, puedes enviar el correo (descomenta para usar)
    if (!isset($error)) {
        $to = "germanv.dev@gmail.com"; // ← cambia esto por tu email real
        $subject = "Nuevo mensaje desde tu portafolio";
        $body = "Nombre: $nombre\nCorreo: $email\nMensaje:\n$mensaje";
        $headers = "From: $email";

        // mail($to, $subject, $body, $headers); // ← activa esto en servidor real

        $mensaje_exito = "Gracias por tu mensaje, $nombre. Te responderé pronto.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Mensaje enviado</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f9f9f9;
      color: #333;
      padding: 2rem;
      text-align: center;
    }
    .mensaje {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      display: inline-block;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .error { color: #c0392b; }
    .exito { color: #27ae60; }
    a {
      display: inline-block;
      margin-top: 1rem;
      color: #3A506B;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="mensaje">
    <?php if (isset($error)): ?>
      <h2 class="error">❌ <?php echo $error; ?></h2>
    <?php else: ?>
      <h2 class="exito">✅ <?php echo $mensaje_exito; ?></h2>
    <?php endif; ?>
    <a href="index.html">Volver al sitio</a>
  </div>
</body>
</html>
