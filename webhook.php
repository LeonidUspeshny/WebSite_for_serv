<?php
// webhook.php — доступен через браузер
require_once '/var/www/private/notify.php';

// Вызываем функцию из notify.php
$ip = getClientIP();
$success = sendTelegramNotification($ip);

if ($success) {
    http_response_code(200);
    echo "Уведомление отправлено";
} else {
    http_response_code(500);
    echo "Ошибка отправки";
}
?>
