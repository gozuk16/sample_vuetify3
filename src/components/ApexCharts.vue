<script setup>
import { onMounted, reactive } from 'vue';
import VueApexCharts from "vue3-apexcharts";

const apexchart = VueApexCharts;
const chartData = reactive({
	series: null,
});
/*
const series = [
  {
    data: [
      {
        x: 'job 1',
        y: [
          new Date('2023-05-13T08:00:00').getTime(),
          new Date('2023-05-13T10:00:00').getTime()
        ]
      },
      {
        x: 'job 1',
        y: [
          new Date('2023-05-13T11:00:00').getTime(),
          new Date('2023-05-13T14:00:00').getTime()
        ]
      },
      {
        x: 'job 2',
        y: [
          new Date('2023-05-13T08:00:00').getTime(),
          new Date('2023-05-13T08:00:50').getTime()
        ]
      },
      {
        x: 'job 3',
        y: [
          new Date('2023-05-13T11:00:00').getTime(),
          new Date('2023-05-13T14:00:00').getTime()
        ]
      },
      {
        x: 'Task C',
        y: [
          new Date('2023-05-13T15:00:00').getTime(),
          new Date('2023-05-13T17:00:00').getTime()
        ]
      },
      {
        x: 'Task D',
        y: [
          new Date('2023-05-13T18:00:00').getTime(),
          new Date('2023-05-13T20:00:00').getTime()
        ]
      }
    ]
  }
];
*/

onMounted(async () => {
	const resp = await fetch('/data.json');
	chartData.series = await resp.json();
});

const currentTime = new Date().getTime();
const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

const chartOptions = {
  chart: {
    height: 250,
    type: 'rangeBar',
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true,
      zoomedArea: {
        fill: {
          color: '#90CAF9',
          opacity: 0.4
        },
        stroke: {
          color: '#0D47A1',
          opacity: 0.4,
          width: 1
        }
      }
    },
    toolbar: {
      autoSelected: 'pan'
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
//      barHeight: '100%',
      distributed: true,
      datalabels: {
	hideOverflowingLabels: false,
      }
    }
  },
  xaxis: {
    type: 'datetime',
    min: currentTime - oneDayInMilliseconds, // 24 hours ago
    max: currentTime, // now
//    min: new Date('2023-05-13T00:00:00').getTime(),
//    max: new Date('2023-05-14T00:00:00').getTime(),
    tickAmount: 24,
    labels: {
      datetimeFormatter: {
	      year: 'yyyy',
	      month: 'yyyy/M',
	      day: 'M/d',
	      hour: 'H:mm',
      },
    }
  },
  annotations: {
    xaxis: [
      {
        x: currentTime,
        borderColor: '#FF0000',
        label: {
          position: 'top',
          borderColor: '#FF0000',
          style: {
            color: '#fff',
            background: '#FF0000',
          },
          text: 'Now',
        }
      }
    ],
  },
  dataLabels: {
    enabled: true,
    formatter: function(val, opts) {
      var a = new Date(val[0]);
      var b = new Date(val[1]);
      var diff = Math.abs(a - b);
      var hours = Math.floor(diff / (1000 * 60 * 60));
      var minutes = Math.floor(diff / (1000 * 60));
      var seconds = Math.floor(diff / 1000);
      var duration = diff + 'ms';
      if (hours < 1) {
        if (minutes < 1) {
		duration = seconds + ' s';
	} else {
		duration = minutes + ' m';
	}
      } else {
	      duration = hours + ' h';
      }
      //return hours + (hours > 1 ? ' hours' : ' hour');
      return duration;
    },
    style: {
      colors: ['#f3f4f5', '#fff']
    }
  },
  grid: {
    row: {
      colors: ['#f3f4f5', '#fff'],
      opacity: 1
    },
  },
  tooltip: {
    x: {
      format: 'H:mm:ss',
    },
  },
};
</script>

<template>
  <div id="app">
    <apexchart type="rangeBar" height="250" v-if="chartData.series" :options="chartOptions" :series="chartData.series"></apexchart>
  </div>
</template>

