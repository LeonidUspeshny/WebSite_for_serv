// sandbox.js

// ====== Данные кейсов SOC ======
const cases = [
    {
        id: 1,
        level: 'L1',
        title: 'Подозрительный PowerShell',
        description: 'Обнаружена команда PowerShell с encodedCommand, outbound connection на неизвестный IP.',
        mitre: ['T1059.001'],
        actions: ['Проверить FP', 'Эскалация в L2', 'Изоляция хоста'],
        score: 0,
        completed: false
    },
    {
        id: 2,
        level: 'L2',
        title: 'Необычный RDP доступ',
        description: 'Более 10 неудачных попыток входа на RDP за 5 минут с одного IP.',
        mitre: ['T1075'],
        actions: ['Анализ логов', 'Блокировка IP', 'Проверка других серверов'],
        score: 0,
        completed: false
    },
    {
        id: 3,
        level: 'L3',
        title: 'DNS Data Exfiltration',
        description: 'Обнаружен DNS tunneling с Base64 payload, более 50 запросов в минуту.',
        mitre: ['T1041'],
        actions: ['Изоляция хоста', 'Сбор дампа памяти', 'Полный RCA'],
        score: 0,
        completed: false
    }
];

// ====== Рендеринг кейсов на странице ======
const caseList = document.getElementById('caseList');

function renderCases() {
    if (!caseList) return;

    caseList.innerHTML = '';
    cases.forEach(c => {
        const card = document.createElement('div');
        card.className = 'case-card';

        // Блокировка L2 и L3 до завершения предыдущего уровня
        let disabled = false;
        if (c.level === 'L2' && !cases[0].completed) disabled = true;
        if (c.level === 'L3' && !cases[1].completed) disabled = true;

        card.innerHTML = `
            <h2>${c.title} (${c.level})</h2>
            <p>${c.description}</p>
            <p>MITRE: ${c.mitre.map(t => `<span class="mitre-badge">${t}</span>`).join('')}</p>
            <ul>
                ${c.actions.map(a => `<li>${a}</li>`).join('')}
            </ul>
            <button ${disabled ? 'disabled style="background:#888; cursor:not-allowed;"' : ''} onclick="completeCase(${c.id})">
                Завершить кейс
            </button>
            <p class="score" id="score-${c.id}">Score: ${c.score}</p>
        `;

        caseList.appendChild(card);
    });
}

// ====== Завершение кейса ======
function completeCase(id) {
    const c = cases.find(c => c.id === id);
    if (!c) return;

    c.score = 100; // демонстрационный score
    c.completed = true;

    const scoreEl = document.getElementById(`score-${id}`);
    if (scoreEl) scoreEl.innerText = `Score: ${c.score}`;

    alert(`Кейс "${c.title}" завершён!`);

    // Перерисовываем для обновления блокировки L2/L3
    renderCases();
}

// ====== Инициализация ======
document.addEventListener('DOMContentLoaded', renderCases);
