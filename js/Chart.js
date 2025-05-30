let barChartInstance = null;

function createBarChart() {
    if (barChartInstance) {
        barChartInstance.destroy(); // 기존 차트 제거
    }

    function generatePastelColors(count) {
        const bgColors = [];
        const borderColors = [];
        for (let i = 0; i < count; i++) {
            const r = Math.floor((Math.random() * 128) + 127);
            const g = Math.floor((Math.random() * 128) + 127);
            const b = Math.floor((Math.random() * 128) + 127);
            bgColors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
            borderColors.push(`rgb(${r}, ${g}, ${b})`);
        }
        return { bgColors, borderColors };
    }

    const categoryCount = reviewApp.category.length;
    const { bgColors, borderColors } = generatePastelColors(categoryCount);

    const data = {
        labels: reviewApp.category,
        datasets: [{
            label: '카테고리별 리뷰 수',
            data: reviewApp.getCategoryCounts(),
            backgroundColor: bgColors,
            borderColor: borderColors,
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true
                    // text: '카테고리별 리뷰 수'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { display: false },
                    grid: { display: false },
                    border: { display: false }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    };

    let chartCanvas = document.getElementById('reviewChart');
    barChartInstance = new Chart(chartCanvas, config); // 새 인스턴스 생성 및 저장
}
