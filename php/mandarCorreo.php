<?php
	if((isset($_POST["nombre"])) and (isset($_POST["tel"])) and (isset($_POST["mensaje"]))){
		$nombre = $_POST["nombre"];
		$tel = $_POST["tel"];
		$correo = $_POST["email"];
		$mensaje = $_POST["mensaje"];
		$dest = "raulc.corrado@hotmail.com";
		$asunto = "Mensaje para Servicio Integral";
		$mensaje = $mensaje . "\r\n\r\n" . "Nombre: " . $nombre;
		$mensaje = $mensaje . "\r\n" . "E-Mail: " . $correo . "\r\n" . "Teléfono: " . $tel;
		$cabecera = "Cc: daniel.corrado@hotmail.com" . "\r\n";
		$cabecera .= "Bcc: flordeate@hotmail.com";


		mail($dest, $asunto, utf8_decode($mensaje), $cabecera);
	}
?>
