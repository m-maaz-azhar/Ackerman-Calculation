let memo = {};

let x = 3;
let y = [];
let avgCount = 5;

for (let i = 0; i < 12; i++) {
  y.push(i);
}

let ans = document.getElementById("ans");

function ack(x, y) {
  if (x === 0) {
    return y + 1;
  } else if (y === 0) {
    return ack(x - 1, 1);
  } else {
    let key = x + "," + y;
    if (key in memo) {
      return memo[key];
    } else {
      memo[key] = ack(x - 1, ack(x, y - 1));
      return memo[key];
    }
  }
}

const calculateTime = (x, y) => {
  let sum = 0;
  for (let i = 0; i < avgCount; i++) {
    let start = performance.now();
    ack(x, y);
    let end = performance.now();
    let time = end - start;
    sum += time;
  }

  return sum / avgCount;
};

const PlotChart = (FinalAverage) => {
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: y,
      datasets: [
        {
          label: "Average Time",
          data: FinalAverage,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          yAxisID: 'y'
        },
        {
            label: "Iteration",
            data: y,
            fill: false,
            borderColor: "#e74c3c",
            tension: 0.1,
            yAxisID: 'y1'
        }
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        y1: {
            beginAtZero: true,
        }
      },
    },
  });
};

window.onload = () => {
  let Average = [];
  for (let i = 0; i < y.length; i++) {
    let Avg = calculateTime(x,i);

    Average.push(Avg);

    ans.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${x}</td>
                <td>${y[i]}</td>
                <td>${Avg}</td>
            </tr>
        `;
  }
  PlotChart(Average);
};
