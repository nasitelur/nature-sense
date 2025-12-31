async function initDashboard() {
  try {
    const response = await fetch("data/dummyData.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();

    const createChart = (canvasId, datasetKey, yAxisLabel, lineColor) => {
      const el = document.getElementById(canvasId);
      if (!el) return;

      const labels = data.timestamps.slice(0, 20);
      const values = data[datasetKey].slice(0, 20);

      new Chart(el.getContext("2d"), {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: yAxisLabel,
              data: values,
              borderColor: lineColor,
              backgroundColor: lineColor + "15",
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 2,
              pointBackgroundColor: lineColor,
              pointBorderColor: "#fff",
              pointBorderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                font: { size: 11, weight: "600" },
                color: "#666",
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "rgba(0,0,0,0.7)",
              padding: 10,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: { color: "#f0f0f0" },
              ticks: { font: { size: 10 } },
              title: { display: true, text: yAxisLabel, font: { size: 10 } },
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 10 } },
            },
          },
        },
      });
    };

    createChart("airTemperatureChart", "airTemperature", "Temperature (°C)", "#FF007F");
    createChart("airHumidityChart", "airHumidity", "Humidity (%)", "#9D00FF");

    createChart("soilTemperatureChart", "soilTemperature", "Temperature (°C)", "#FF5E00");
    createChart("soilMoistureChart", "soilMoisture", "Moisture (%)", "#00FF95");
    createChart("soilPHChart", "soilPH", "pH", "#CCFF00");

    createChart("soilRainfallPerFiveMinsChart", "rainfallFiveMins", "Rain 5m (mm)", "#00E5FF");
    createChart("soilRainfallPerHourChart", "rainfallHourly", "Rain 1h (mm)", "#007BFF");
  } catch (err) {
    console.error("Dashboard Load Error:", err);
  }
}

document.addEventListener("DOMContentLoaded", initDashboard);
