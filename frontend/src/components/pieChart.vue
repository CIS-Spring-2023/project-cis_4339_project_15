<script>
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
  async mounted() {
    try {
      // Make API call to fetch data from MongoDB using Axios
      const response = await axios.get('http://127.0.0.1:3000/api/piechartData');
      const data = response.data;

      // Extract labels and data from the API response
      const labels = data.map(item => item.label);
      const chartData = data.map(item => item.value);

      // Create chart
      await new Chart(this.$refs.myChart, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Clients by Zipcode',
            data: chartData,
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
    } catch (err) {
      console.error('Failed to fetch pie chart data:', err);
      // Handle error as needed
    }
  },
};
</script>

<template>
  <canvas ref="myChart"></canvas>
</template>