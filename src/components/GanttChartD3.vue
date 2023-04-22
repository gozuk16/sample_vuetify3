<template>
  <div>
    <svg ref="svg" :width="width + margin.left + margin.right" :height="height + margin.top + margin.bottom"></svg>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';

const tasks = [
  { id: 1, name: "Task 1", start: "2023-04-01T23:00", end: "2023-04-02T03:00" },
  { id: 2, name: "Task 2", start: "2023-04-01T23:00", end: "2023-04-02T07:00" },
  { id: 3, name: "Task 3", start: "2023-04-01T23:00", end: "2023-04-02T07:59" },
];

const margin = { top: 30, right: 30, bottom: 30, left: 150 };
const width = 1000 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = ref(null);

onMounted(() => {
  const x = d3.scaleUtc()
    .domain([new Date(tasks[0].start), new Date(tasks[0].end)])
    .range([margin.left, width - margin.right]);

  const y = d3.scaleBand()
    .domain(tasks.map((task) => task.id))
    .range([margin.top, height - margin.bottom])
    .padding(0.1);

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeHour.every(1))
          .tickFormat(d3.timeFormat("%Y-%m-%d %H:%M"))
          .tickSizeInner(-(height - margin.top - margin.bottom))
          .tickSizeOuter(0)
      );

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickValues(tasks.map((task) => task.id))
          .tickSizeInner(-(width - margin.left - margin.right))
          .tickSizeOuter(0)
      )
      .call(g => g.selectAll(".tick text")
        .data(tasks)
        .text(d => d.name));

  const chart = d3.select(svg.value);
  chart.append("g").call(xAxis);
  chart.append("g").call(yAxis);

  chart.append("g")
    .selectAll("rect")
    .data(tasks)
    .join("rect")
    .attr("x", (d) => x(new Date(d.start)))
    .attr("y", (d) => y(d.id))
    .attr("width", (d) => x(new Date(d.end)) - x(new Date(d.start)))
    .attr("height", y.bandwidth())
    .attr("fill", "steelblue");
});
</script>

