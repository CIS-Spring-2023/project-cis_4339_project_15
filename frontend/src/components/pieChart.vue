<script>
// importing chart js package and dependecies
  import { Chart, registerables } from 'chart.js'
  
  Chart.register(...registerables);
  // MOre config
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
        // config for if chart is mounted
        // log data for debugging

      console.log(this.chartData);
      await new Chart(this.$refs.myChart, {
        // define chart type
        type: 'pie',
        // Loading of dummy data
        data: {
        labels: [
        '77004',
        '77003',
        '77005',
        '77012',
        '77015',
        '77020'
        ],
        datasets: [{
        label: 'Clients by Zipcode',
        data: [7, 2, 10,15,3,20],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 150, 100)',
            'rgb(100, 100, 150)',
            'rgb(300, 15, 86)',
        ],
        hoverOffset: 4
        }]
        }
      });
    },
  };
  </script>
<!-- Calling Chart  -->
  <template>
    
    <canvas ref="myChart"></canvas>

  </template>