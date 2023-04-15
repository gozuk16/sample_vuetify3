<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Batch Execution Time
          </v-card-title>
          <v-card-text>
            <canvas ref="chart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart, LineController, LinearScale, CategoryScale } from "chart.js/auto";

Chart.register(LineController, LinearScale, CategoryScale);

const chart = ref(null);

onMounted(() => {
  const data = {
    labels: ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"],
    datasets: [
      {
        label: "Execution Time (ms)",
        data: [500, 1000, 750, 1200, 900],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  const ctx = chart.value.getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
});
</script>

