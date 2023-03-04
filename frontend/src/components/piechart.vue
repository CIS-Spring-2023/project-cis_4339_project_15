<template>
    <canvas ref="myChart"></canvas>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js'
  
  Chart.register(...registerables);
  export default {
    props: {
      label: {
        type: Array,
      },
      chartData: {
        type: Array,
      },
    },
    async mounted() {
      console.log(this.chartData);
      await new Chart(this.$refs.myChart, {
        type: 'pie',
        data: {
        labels: [
        'Red',
        'Blue',
        'Yellow'
        ],
        datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
        }]
        },
        options: {
          scales: {
              y: {
                  min: 100
              }
          }
        }
      });
    },
  };
  </script>