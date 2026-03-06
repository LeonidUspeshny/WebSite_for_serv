const ctx = document.getElementById('alertChart').getContext('2d');
const alertChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Critical', 'High', 'Medium', 'Low'],
        datasets: [{
            label: 'Alerts',
            data: [12, 19, 7, 3],
            backgroundColor: ['#d32f2f', '#f57c00', '#fbc02d', '#388e3c']
        }]
    }
});
