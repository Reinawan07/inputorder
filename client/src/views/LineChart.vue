<template>
  <div>
    <!-- <canvas id="myChart" width="400" height="400"></canvas> -->
    <div class="p-4 sm:ml-64">
      <div
        class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >
        <canvas id="myChart" width="200" height="100"></canvas>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Chart from "chart.js/auto";

export default {
  mounted() {
    var ctx = document.getElementById("myChart");

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
        datasets: [
          {
            label: "# of Votes",
            data: [251437000, 469456000, 754631000, 444912000, 159987000, 387547000],
            borderColor: [
              "rgba(39, 67, 245, 0.8)",
              "rgba(215, 14, 14, 0.8)",
              "rgba(14, 215, 28, 0.8)",
              "rgba(215, 14, 213, 0.8)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  },
};
</script>
  
  <style>
</style>