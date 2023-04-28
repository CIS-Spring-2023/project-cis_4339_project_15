<script>
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
const apiURL = import.meta.env.VITE_ROOT_API

Chart.register(...registerables);

export default {
  async mounted() {
    try {
      const response = await axios.get(`${apiURL}/clients/piechartData`); // Make API call to fetch data from MongoDB using Axios
      const data = response.data;

      // Extract labels and data from the API 
      const labels = data.map(item => item.zip);
      const chartData = data.map(item => item.value);

      // Create pie chart
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
      // Handle error
    }
  },
};
</script>

<template>
  <canvas ref="myChart"></canvas>
</template>