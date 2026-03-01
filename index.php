<?php
// Подключаем скрипт уведомлений
require_once '/var/www/private/notify.php';

// Получаем IP посетителя
$visitorIP = getClientIP();

// Отправляем уведомление в Telegram
sendTelegramNotification($visitorIP);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <button class="login-button" id="loginBtn">Войти</button>
        <div class="warning">Осторожно</div>
    </div>

    <!-- Подключение внешнего JavaScript-файла -->
    <script src="script.js"></script>
</body>
</html>
