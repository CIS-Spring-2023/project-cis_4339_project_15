<script>
import { Chart, registerables } from 'chart.js'
import axios from 'axios' // import Axios library for making HTTP requests
Chart.register(...registerables)

export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  async mounted() {
    await this.fetchChartData() // Call the fetchChartData method on component mount
    this.renderChart() // Call the renderChart method to render the chart
  },
  methods: {
    async fetchChartData() {
      try {
        // Make an HTTP GET request to fetch chart data from backend API
        const response = await axios.get('http://127.0.0.1:3000/api/chartData') // Update URL to match your backend route
        const chartData = response.data // Assuming the response is an array of chart data objects
        this.label = chartData.map(event => event.label) // Update label prop with fetched data
        this.chartData = chartData.map(event => event.value) // Update chartData prop with fetched data
      } catch (error) {
        console.error('Failed to fetch chart data:', error)
        // Handle error as needed
      }
    },
    renderChart() {
      const backgroundColor = this.chartData.map(() => this.getColor())
      const borderColor = backgroundColor.map((e) =>
        e.replace(/[\d\.]+\)$/g, '1)')
      )
      new Chart(this.$refs.attendanceChart, {
        type: 'bar',
        data: {
          labels: this.label,
          datasets: [
            {
              borderWidth: 1,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              data: this.chartData
            }
          ]
        },
        options: {
          scales: {
            y: {
              ticks: {
                stepSize: 1
              }
            },
            x: {
              gridLines: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          responsive: true,
          maintainAspectRatio: true
        }
      })
    },
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    }
  }
}
</script>

<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>
