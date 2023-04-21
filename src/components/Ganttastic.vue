<template>
  <g-gantt-chart
    chart-start="2023-04-16 08:00"
    chart-end="2023-04-17 07:00"
    precision="hour"
    width="100%"
    bar-start="myBeginDate"
    bar-end="myEndDate"
  >
    <g-gantt-row
      label="My row 1"
      :bars="row1BarList"
    />
    <g-gantt-row
      label="My row 2"
      :bars="row2BarList"
    />
  </g-gantt-chart>
</template>

<script setup>

import { ref } from "vue"

const row1BarList = ref([
  {
    myBeginDate: "2023-04-16 13:00",
    myEndDate: "2023-04-16 19:00",
    ganttBarConfig: {    // each bar must have a nested ganttBarConfig object ...
      id: "unique-id-1", // ... and a unique "id" property
      label: "Lorem ipsum dolor",
      immobile: true,
    }
  }
])
const row2BarList = ref([
  {
    myBeginDate: "2023-04-16 00:00",
    myEndDate: "2023-04-17 02:00",
    ganttBarConfig: {
      id: "another-unique-id-2",
      hasHandles: true,
      label: "Hey, look at me",
      style: {     // arbitrary CSS styling for your bar
        background: "#e09b69",
        borderRadius: "20px",
        color: "black"
      }
    }
  }
])
</script>

