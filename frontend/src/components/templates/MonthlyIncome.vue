<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ["chartData"],
  data: function() {
      return {
          chartdata: {
            labels: ["Tarefas Finalizadas", "Tarefas Vencidas", " Tarefas Criadas"],
            datasets: [
              {
                backgroundColor: ["#0c8a6a", "#777", "#00bf8f"],
                data: [
                this.chartData["finishedTasksCount"], 
                this.chartData["expiredTasksCount"], 
                this.chartData["totaltasksCount"]
               ]
              } 
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }

      }
  },  
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
}
</script>

<style>
</style>