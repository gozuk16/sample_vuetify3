<template>
  <div>
    <svg ref="chart" style="width: 100%; height: 400px;"></svg>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as d3 from "d3";

export default {
  setup() {
    const chart = ref(null);

    onMounted(() => {
      const tasks = [
        {
          id: "Task 1",
          name: "Task 1",
          start: "2023-04-01",
          end: "2023-04-10",
          progress: 100,
        },
        {
          id: "Task 2",
          name: "Task 2",
          start: "2023-04-11",
          end: "2023-04-20",
          progress: 50,
        },
        {
          id: "Task 3",
          name: "Task 3",
          start: "2023-04-21",
          end: "2023-04-30",
          progress: 25,
        },
      ];

      const svg = d3.select(chart.value);
      const width = svg.node().getBoundingClientRect().width;
      const height = svg.node().getBoundingClientRect().height;
      const margin = { top: 50, right: 40, bottom: 50, left: 200 };

      const x = d3
        .scaleTime()
        .domain([
          new Date(tasks[0].start),
          d3.timeDay.offset(new Date(tasks[tasks.length - 1].end), 1),
        ])
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleBand()
        .domain(tasks.map((d) => d.id))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${margin.top})`)
          .call(d3.axisTop(x).ticks(width / 80).tickSizeOuter(0));

      const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).tickSizeOuter(0));

      const bars = svg
        .append("g")
        .selectAll("rect")
        .data(tasks)
        .join("rect")
        .attr("x", (d) => x(new Date(d.start)))
        .attr("y", (d) => y(d.id))
        .attr("width", (d) => x(new Date(d.end)) - x(new Date(d.start)))
        .attr("height", y.bandwidth())
        .attr("fill", "steelblue");

      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);
    });

    return { chart };
  },
};
</script>
<style scoped>
.bar {
  fill: steelblue;
}
.axis text {
  font-size: 12px;
}
#gantt {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


