<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

Chart.register(...registerables)

export default {
  data() {
    return {
      label: [],
      chartData: []
    }
  },
  async mounted() {
    await this.fetchbarChartData()
    this.renderbarChart()
  },
  methods: {
    async fetchbarChartData() {
      try {
        const response = await axios.get(`${apiURL}/events/barchartData`) //Make API call to fetch data from MongoDB using Axios
        const chartData = response.data
        // Fetch event name, event date, and number of attendees when user move cursor to bar chart
        this.label = chartData.map(event => `${event.label}\n${event.date}`)
        this.chartData = chartData.map(event => event.value)
      } catch (error) {
        console.error('Failed to fetch chart data:', error)
        // Handle error
      }
    },
    renderbarChart() {
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
