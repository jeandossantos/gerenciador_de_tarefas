<template>
    <div class="modal-task d-flex justify-content-end mb-3">
        <b-button title="Criar nova Tarefa" v-b-modal.modal-task><i class="fas fa-plus-square"></i> <b>Nova Tarefa</b></b-button>
        <b-modal hide-footer  header-bg-variant="success" centered header-text-variant="light"
        @hidden = "reset"
        title="Cadastro de Tarefa" id="modal-task">
            <b-form >
                <b-form-group
                label="Nome:"
                label-for="task-name"
                >
                    <b-form-input
                    :state="stateName()"
                    id="task-name"
                    v-model="task.name"
                    type="text"
                    placeholder="Insira o nome da tarefa"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                label="Descrição:"
                label-for="task-description"
                >
                    <b-form-textarea
                    id="task-description"
                    v-model="task.description"
                    type="text"
                    placeholder="Insira a descrição(detalhes) da tarefa"
                    required
                    ></b-form-textarea>
                </b-form-group>  
                <b-form-group
                label="Prioridade:"
                label-for="task-priority"
                >
                <b-form-radio-group
                    :options="options"
                    v-model="task.priority"
                    ></b-form-radio-group>
                </b-form-group> 
                <b-form-checkbox class="mb-3"
                id="task-done"
                v-model="task.done"
                >
                Finalizada?
                </b-form-checkbox>
                <b-form-group
                label="Prazo:"
                label-for="task-deadline"
                >
                    <datetime v-model="task.deadline" 
                        :input-class="[task.deadline ? 'form-control is-valid' : 'form-control is-invalid']" type="datetime"
                        value-zone="America/Sao_Paulo" :phrases="{ok: 'Continue', cancel: 'Sair'}"
                        format="dd/MM/yyyy HH:mm" input-id="task-deadline" :use12-hour="true" required
                    />
                </b-form-group>     
                    <hr>
                <b-button @click.p="save" v-show="mode === 'save'" class="mr-2" variant="primary">Salvar</b-button>
                <b-button @click.p="save" v-show="mode === 'edit'"  class="mr-2" variant="primary">Salvar Alterações</b-button>
                <b-button @click="reset" variant="danger">Cancelar</b-button>
            <hr>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
import { Datetime } from 'vue-datetime';

export default {
    name: 'ModalTask',
    components: { datetime: Datetime },
    props: ['task', 'reset', 'mode'],
    data: function() {
        return {
            options: [
                { text: 'Baixa', value: 0 },
                { text: 'Média', value: 1 },
                { text: 'Alta', value: 2 }
            ]
        }
    },
    computed: {
        
    },
    methods: {
        save() {
            this.$store.dispatch('save', {
                task: this.task,
                reset: this.reset,
                alert: this.$toasts
            });
        },
        stateName() {
            return this.task.name && this.task.name.length > 3  ? true : false;
        },
        stateDeadline() {
            return this.task.deadline  ? true : false;
        }
    }
}
</script>

<style>

input#task-deadline {
    width: 200px;
}
</style>