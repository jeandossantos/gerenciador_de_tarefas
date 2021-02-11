<template>
    <div class="dialy-tasks">
          <div class="search d-flex justify-content-center">
            <b-input-group  id="type-search" class="mb-3" prepend="Pesquisar">
                <b-form-input v-model="searchValue" type="search"></b-form-input>
                <b-input-group-append>
                  <b-button @click="search"  text="Button"><i class="fas fa-search"></i></b-button>
                </b-input-group-append>
              </b-input-group>        
          </div>
        
        <b-table :items="dailyTasks" :fields="fields" striped responsive="sm">
              <template #cell(show_details)="row">
                  <b-button size="sm" title="Mostrar detalhes" @click="row.toggleDetails">
                      <i :class="[row.detailsShowing ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
                  </b-button>
                  <b-button size="sm" title="Finalizar Tarefa" @click="finished(row.item.id)" class="ml-2" variant="primary"><i class="fas fa-check-square"></i></b-button>
                  <b-button size="sm" title="Editar Tarefa" @click="loadTask(row.item, 'edit')"  class="ml-2"  variant="warning"><i class="fas fa-edit"></i></b-button>
                  <b-button size="sm" title="Excluir Tarefa" @click="remove(row.item.id) " class="ml-2" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
        </template>
        <template #cell(priority)="data"> 
          <b :class="getPriorityClass(data.item.priority)"  > {{ getPriority(data.item.priority) }} </b> 
        </template >
        <template #cell(done)="data"> 
          <b :class="getStatusClass(data.item)"  > {{ getStatus(1, 2, data.item) }} </b> 
        </template >
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Criado em:</b></b-col>
              <b-col>{{ formatterDate(row.item.createdAt) }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Nome:</b></b-col>
              <b-col>{{ row.item.name }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Descrição:</b></b-col>
              <b-col>{{ row.item.description }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Prioridade:</b></b-col>
              <b-col>{{ getPriority(row.item.priority) }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Status:</b></b-col>
              <b-col>{{ getStatus(1, 2, row.item) }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Prazo:</b></b-col>
              <b-col>{{ formatterDate(row.item.deadline) }}</b-col>
            </b-row>
            
            <b-button size="sm" @click="row.toggleDetails">Esconder Detalhes</b-button>
          </b-card>
        </template>
        </b-table>
        <div class="overflow-auto">
          <b-pagination
              v-model="page"
              :total-rows="dailyTasksCount"
              :per-page="dailyTasksLimit"
              aria-controls="my-table"
              align="center"
            ></b-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'DialyTasks',
    computed: mapState(["dailyTasks", "dailyTasksCount", "dailyTasksLimit"]),
    props: ["loadTask", "fields", "getPriority", "getStatusClass", "getStatus", 
            "formatterDate", "mode", "getPriorityClass"],
    data: function() {
      return {
        page: 1,
        searchValue: ''
      }
    },
    methods: {
        remove(id) {
          this.$store.dispatch('remove', id);
        },
        finished(id) {
          this.$store.dispatch('finished', id);
        },
         loadDailyTasks() {
          this.$store.dispatch('loadDailyTasks', { page: this.page, search: this.searchValue  });
        },
        search() {
          this.$store.dispatch('loadDailyTasks', { page: this.page, search: this.searchValue  });
        }
    },
   watch: {
        page() {
            this.loadDailyTasks();
        }
    }
}
</script>

<style>



</style>