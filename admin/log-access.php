<?php
// Включаем логирование ошибок
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Получаем данные из POST‑запроса
$data = json_decode(file_get_contents('php://input'), true);

// Форматируем запись в лог
$logEntry = sprintf(
    "[%s] IP: %s | Страница: %s\n",
    date('Y-m-d H:i:s'),
    $data['ip'] ?? 'unknown',
    $data['page'] ?? 'unknown'
);

// Записываем в лог‑файл
file_put_contents('honeypot_access.log', $logEntry, FILE_APPEND | LOCK_EX);

// Возвращаем успешный ответ
http_response_code(200);
echo json_encode(['status' => 'logged']);
?>
