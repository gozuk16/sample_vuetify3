<template>
   <v-app>
      <v-app-bar color="grey-lighten-2">
        Appバー
        <v-spacer />
        <v-divider vertical />
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn text v-bind="props">foo</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn text>bar</v-btn>
        <v-divider vertical />
        <v-btn text>info</v-btn>
      </v-app-bar>
      <v-main>
        <Sample />
      </v-main>
        <BatchExecutionTimeChart />
        <MermaidChart />
        <GanttChartD3 />
        <Ganttastic />
        <ApexCharts />
    </v-app>

</template>

<script setup>
import Sample from './components/Sample.vue'
import BatchExecutionTimeChart from './components/BatchExecutionTimeChart.vue'
import MermaidChart from './components/MermaidChart.vue'
import GanttChartD3 from './components/GanttChartD3.vue'
import Ganttastic from './components/Ganttastic.vue'
import ApexCharts from './components/ApexCharts.vue'
</script>

<script>
  export default {
    components: {
      BatchExecutionTimeChart,
      MermaidChart,
      GanttChartD3,
      Ganttastic,
      ApexCharts,
    },
    data: () => ({
      items: [
        { title: 'Menu1' },
        { title: 'Menu2' },
        { title: 'Menu3' },
        { title: 'Menu4' },
      ],
      closeOnContentClick: true,
    }),
  }
</script>
