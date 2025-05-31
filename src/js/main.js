async function renderAirTemperatureChart() {
  try {
    const response = await fetch("db/temperatureData.json");
    if (!response.ok) throw new Error("Failed to fetch data");

    const json = await response.json();

    const ctx = document.getElementById("airTemperatureChart").getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: json.labels,
        datasets: [
          {
            label: "Temp (°C)",
            data: json.values,
            fill: true,
            borderColor: "#e560dc",
            backgroundColor: "rgba(229, 96, 220, 0.1)",
            tension: 0.4,
            pointBackgroundColor: "#d840b6",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "°C",
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error loading temperature chart data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAirTemperatureChart();
});
