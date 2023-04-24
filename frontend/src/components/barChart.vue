<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import axios from 'axios'

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
        const response = await axios.get('http://127.0.0.1:3000/api/barchartData')
        const chartData = response.data
        this.label = chartData.map(event => event.label)
        this.chartData = chartData.map(event => event.value)
        console.log(response.data);
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
