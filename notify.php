<?php
function sendTelegramNotification($ip) {
    $botToken = 'Ваш токен'; // замените на токен бота
    $chatId = 'Id Chat';   // замените на ID чата

    $message = "🌐 Новый посетитель сайта!\n"
           . "IP-адрес: $ip\n"
           . "Время: " . date('Y-m-d H:i:s') . "\n"
           . "Страница: " . $_SERVER['REQUEST_URI'];

    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";

    $data = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    return $result !== false;
}

function getClientIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ips[0]);
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

