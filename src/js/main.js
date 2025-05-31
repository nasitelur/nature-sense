async function renderChart(canvasId, datasetKey, yAxisLabel, lineColor) {
  try {
    const response = await fetch("data/dummyData.json");
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();

    const labels = data.timestamps.slice(0, 20);
    const values = data[datasetKey].slice(0, 20);

    const ctx = document.getElementById(canvasId).getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: yAxisLabel,
            data: values,
            fill: true,
            borderColor: lineColor,
            backgroundColor: lineColor + "20",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: lineColor,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              usePointStyle: true,
              pointStyle: "line",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: yAxisLabel,
            },
          },
        },
      },
    });
  } catch (err) {
    console.error(`Error rendering chart for ${canvasId}:`, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderChart("airTemperatureChart", "airTemperature", "Air Temperature (°C)", "#e560dc");
  renderChart("airHumidityChart", "airHumidity", "Air Humidity (%)", "#5d13e6");
  renderChart("soilTemperatureChart", "soilTemperature", "Soil Temperature (°C)", "#ef5f5f");
  renderChart("soilMoistureChart", "soilMoisture", "Soil Moisture (%)", "#d840b6");
});
