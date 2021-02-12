<template>
  <div class="task">
      <PageTitle icon="fas fa-tasks" title="Gerenciador de Tarefas"
      subtitle="Crie, pesquise, atualize e remova suas tarefas nessa página." />
      <div class="task-table mt-4">
        <ModalTask :mode="mode" :task="task" :reset="reset"  />
        <b-tabs align="center" lazy>
          <b-tab title="Tarefas do Dia" active>
            <DialyTasks :getStatusClass="getStatusClass" :loadTask="loadTask" :fields="fields" 
            :getStatus="getStatus" :getPriority="getPriority" :formatterDate="formatterDate" :mode="mode" 
            :getPriorityClass="getPriorityClass" />
          </b-tab>
          <b-tab title="Todas as Tarefas">
            <AllTasks :getStatusClass="getStatusClass" :loadTask="loadTask" :fields="fields" 
            :getStatus="getStatus" :getPriority="getPriority" :formatterDate="formatterDate" :mode="mode"
            :getPriorityClass="getPriorityClass" />
          </b-tab>
        </b-tabs>
      </div>
  </div>
</template>

<script>
import PageTitle from '../templates/PageTitle';
import ModalTask from './ModalTask';
import DialyTasks from './DialyTasks';
import AllTasks from './AllTasks';

export default {
    name: 'Task',
    components: { PageTitle, ModalTask, DialyTasks, AllTasks },
    data: function() {
        return {
            task: {},
            fields: [
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'priority', label: 'Prioridade', sortable: true, formatter: (value) => {
                    return this.getPriority(value);
                } },
                { key: 'done', label: 'Status', sortable: true, formatter: this.getStatus },
                { key: 'show_details', label: 'Ações' }
            ],
            mode: 'save',
            search: ''
        }
    },
    methods: {   
        getPriority(value) {
            if(value === 2) {
                return 'Alta';
            } else if(value === 1) {
                return 'Média';
            } else {
                return 'Baixa';
            }
        },
        getStatus(value, i, task) {
          const dateDb = new Date(task.deadline);
          const dateNow = new Date();

          if(!task.done && dateDb.getTime() < dateNow.getTime()) {
            return 'Vencida';
          } else if(task.done) {
            return 'Finalizada';
          } else {

            return 'Em Espera';
          }
        },
        getStatusClass(task) {
          const dateDb = new Date(task.deadline);
          const dateNow = new Date();

          if(!task.done && dateDb.getTime() < dateNow.getTime()) {
            return 'text-danger';
          } else if(task.done) {
            return 'text-success';
          } else {
            return 'text-info';
          }
        },
        getPriorityClass(value) {
          if(value === 2) {
                return 'text-danger';
            } else if(value === 1) {
                return 'text-warning';
            } else {
                return 'text-primary';
            }
        },
        formatterDate(value) {
            const date = new Date(value);
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        },
        reset() {
          this.task = {};
          this.task.priority = 0;  
          this.mode = 'save';
        },
        loadTask(task, mode = 'save') {
          this.mode = mode;
          this.task = { ...task };
          this.$bvModal.show('modal-task');
        }
    },
    created() {
        this.task.priority = 0;
    }
}
</script>

<style>

  .task .task-table {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  }

  .nav-tabs .nav-link {
    background-color: #00bf8f;
    color: #fff;
  }

  .nav-tabs .nav-link.active {
    background-color: #189a79;
    color: #fff;
    font-weight: bolder;
  }

  ul#__BVID__16__BV_tab_controls_ {
    margin-top: 5px;
  }

  #type-search {
    width: 400px;
  }

  .task .text-name {
    color: #777;
  }
</style>