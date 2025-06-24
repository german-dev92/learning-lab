<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['consentimiento'])) {
        die("Debes aceptar la política de privacidad.");
    }

    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    // Aquí podés enviar el mail o guardar el mensaje de forma segura

    echo "Gracias por tu mensaje.";
}
?>
