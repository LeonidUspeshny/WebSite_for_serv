document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginBtn').addEventListener('click', async function () {
        try {
            // Получаем IP через надёжный API
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const clientIP = ipData.ip;

            // Получаем информацию по IP через ipinfo.io (не требует ключа для базовых данных)
            const infoResponse = await fetch(`https://ipinfo.io/${clientIP}/json`);
            const infoData = await infoResponse.json();

            showEnhancedPopup(clientIP, infoData);
        } catch (error) {
            console.error('Критическая ошибка:', error);
            showEnhancedPopup('Не удалось определить IP-адрес', {
                country: 'Недоступно',
                city: 'Недоступно',
                region: 'Недоступно'
            });
        }
    });
});

function showEnhancedPopup(ip, info) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    `;

    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        padding: 30px 40px;
        border-radius: 15px;
        text-align: center;
        max-width: 500px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        animation: fadeIn 0.3s;
        overflow-y: auto;
        max-height: 80vh;
    `;

    // Парсинг данных из ipinfo.io
    const country = info.country || 'Неизвестно';
    const city = info.city || 'Неизвестно';
    const region = info.region || 'Неизвестно';
    const postal = info.postal || 'Неизвестно';

    let loc = '—, —';
    if (info.loc) {
        const [lat, lng] = info.loc.split(',');
        loc = `${lat || '—'}, ${lng || '—'}`;
    }

    const timezone = info.timezone || 'Неизвестно';
    const org = info.org || 'Неизвестно';

    let content = `
        <h3 style="color: #4CAF50; margin-bottom: 10px;">Информация об IP‑адресе</h3>
        <p style="font-size: 24px; font-weight: bold; color: #2196F3; margin: 20px 0;">${ip}</p>
    `;

    if (info && Object.keys(info).length > 0) {
        content += `
            <div style="text-align: left; margin: 20px 0; line-height: 1.6;">
                <p><strong>Страна:</strong> ${country}</p>
                <p><strong>Город:</strong> ${city}</p>
                <p><strong>Регион:</strong> ${region}</p>
                <p><strong>Почтовый индекс:</strong> ${postal}</p>
                <p><strong>Широта/Долгота:</strong> ${loc}</p>
                <p><strong>Часовой пояс:</strong> ${timezone}</p>
                <p><strong>Провайдер:</strong> ${org}</p>
            </div>
        `;
    } else {
        content += `<p style="color: #d32f2f;">Не удалось загрузить дополнительную информацию</p>`;
    }

    content += `
        <button id="closePopupBtn" style="padding: 12px 24px; background: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; margin-top: 15px;">
            Закрыть
        </button>
    `;

    popup.innerHTML = content;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Добавляем обработчик клика для кнопки «Закрыть»
    document.getElementById('closePopupBtn').addEventListener('click', function () {
        document.body.removeChild(overlay);
        showWarningPopup(); // Показываем предупреждение после закрытия первого окна
    });
}

function showWarningPopup() {
    const warningOverlay = document.createElement('div');
    warningOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const warningPopup = document.createElement('div');
    warningPopup.style.cssText = `
        background: #fff3e0;
        padding: 35px 45px;
        border-radius: 15px;
        text-align: center;
        max-width: 600px;
        box-shadow: 0 10px 35px rgba(0,0,0,0.3);
        animation: fadeIn 0.4s;
        overflow-y: auto;
        max-height: 85vh;
        border: 3px solid #ff9800;
    `;

    const warningContent = `
        <h3 style="color: #e65100; margin-bottom: 20px;">Предупреждение</h3>
        <div style="text-align: left; margin: 20px 0; line-height: 1.7; color: #333;">
            <p><strong>ВНИМАНИЕ!</strong> Попытка сканирования информационных систем без разрешения владельца является <strong>незаконной</strong>.</p>

            <p>Подобные действия могут повлечь за собой:</p>

            <ul style="text-align: left; margin-left: 20px;">
                <li>Административную ответственность (КоАП РФ, ст. 13.12)</li>
                <li>Уголовную ответственность (УК РФ, ст. 272, 273, 274)</li>
                <li>Гражданско‑правовую ответственность за причинённый ущерб</li>
            </ul>

            <p style="margin-top: 20px;"><strong>Последствия могут включать:</strong></p>
            <ul style="text-align: left; margin-left: 20px;">
                <li>Штрафы до 500 000 рублей</li>
                <li>Лишение свободы до 7 лет</li>
                <li>Конфискацию оборудования</li>
                <li>Возмещение материального ущерба</li>
            </ul>

            <p style="margin-top: 25px; color: #666; font-style: italic;">Данная система ведёт логирование всех подключений и попыток сканирования.</p>
            <p style="margin-top: 25px; color: #666; font-style: italic;">e-mail для связи deploy-job@yandex.ru </p>
        </div>

        <button id="closeWarningBtn" style="padding: 14px 28px; background: #ff9800; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; margin-top: 20px; font-weight: bold;">
            Понял(а), закрыть
        </button>
    `;

    warningPopup.innerHTML = warningContent;
    warningOverlay.appendChild(warningPopup);
    document.body.appendChild(warningOverlay); // Исправлено: добавлен appendChild для добавления оверлея в DOM

    // Обработчик для кнопки закрытия предупреждения
    document.getElementById('closeWarningBtn').addEventListener('click', function () {
        document.body.removeChild(warningOverlay);
    });

    // Закрытие по клавише Esc
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(warningOverlay);
            document.removeEventListener('keydown', escHandler);
        }
    });
}