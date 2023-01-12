let memo = {};

let x = 2;
let y = [];

for (let i = 0; i < 500; i++) {
    y.push(i);
}

let ans = document.getElementById("ans");

function ack(x, y) {
    if (x === 0) {
        return y + 1;
    } else if (y === 0) {
        return ack(x - 1, 1);
    } else {
        let key = x + ',' + y;
        if (key in memo) {
            return memo[key];
        } else {
            memo[key] = ack(x - 1, ack(x, y - 1));
            return memo[key];
        }
    }
}

const calculateTime = (x,y) => {
    let start = performance.now();
    ack(x,y);
    let end = performance.now();
    let time = end - start;
    return time
}

const PlotChart = (FinalAverage)=>{
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: y,
            datasets: [{
                label: 'Average Time of Execution with Respect to Y',
                data: FinalAverage,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}

window.onload = ()=>{
    let FinalAverage = [];
    for (let i = 0; i < y.length; i++) {
        let AvgTime = [];
        for(let i=0; i < 3; i++){
            AvgTime.push(calculateTime(x,y[i]));
        }
        let Avg = 0;
        for (const element of AvgTime) {
            Avg += element;
        }
        FinalAverage.push(Avg/3)
            
        ans.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${x}</td>
                <td>${y[i]}</td>
                <td>${Avg/3}</td>
            </tr>
        `;        
    }
    PlotChart(FinalAverage);
};