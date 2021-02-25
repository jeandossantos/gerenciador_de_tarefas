<template>
    <div class="profile">
        <b-modal
        hide-footer
        id="delete-user"
        title="Informe a senha para continuar"
        centered>
        <b-alert show variant="warning">
            <small>
                <i class="fas fa-exclamation-circle"></i>
                Ao excluir sua conta todas as tarefas criadas serão perdidas permanentemente.
            </small>
        </b-alert>
            <form>
                <b-form-group
                label="Senha:"
                label-for="password-input"                
                >
                <b-form-input
                    id="password-input"
                    type="password"
                    v-model="password"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <b-button @click.prevent="deleteUser" variant="outline-danger" class="mr-2">Sim, exclua minha conta</b-button>
            <b-button variant="outline-secondary">Cancelar</b-button>
        </b-modal>
        <PageTitle title="Perfil do Usuário" subtitle="Atualize suas informações de usuário aqui." />
        <b-form >
          <b-row>
              <b-col sm="8">
                <b-form-group
                label="Nome:"
                label-for="user-name"
                >
                    <b-form-input
                    :readonly="!edit"
                    id="user-name"
                    v-model="user.name"
                    type="text"
                    placeholder="Insira seu nome"
                    required
                    ></b-form-input>
                </b-form-group>      
              </b-col>
              <b-col sm="4">
                <b-form-group
                label="Iniciais:"
                label-for="user-initiais"
                >
                    <b-form-input
                    :readonly="!edit"
                    id="user-initiais"
                    v-model="user.initiais"
                    type="text"
                    placeholder="Ex: JS"
                    required
                    :max=2
                    ></b-form-input>
            </b-form-group>
      
              </b-col>
          </b-row>
        <b-form-group
        label="E-mail:"
        label-for="user-email"
        >
            <b-form-input
            :readonly="!edit"
            v-model="user.email"
            type="email"
            placeholder="Insira seu E-mail"
            required
            ></b-form-input>
        </b-form-group>
        <!-- <b-row>
            <b-col sm="12" md="6">
                <b-form-group id="user-password" label="Senha:" label-for="user-password">
                        <b-form-input
                        type="password"
                        id="user-password"
                        v-model="user.password"
                        placeholder="Insira sua Senha"
                        required
                        ></b-form-input>
                </b-form-group>

            </b-col>
            <b-col sm="12" md="6">
                <b-form-group id="user-confirmPassword" label="Confirmação de Senha:" label-for="user-confirmPassword">
                        <b-form-input
                        type="password"
                        id="user-confirmPassword"
                        v-model="user.confirmPassword"
                        placeholder="Confime sua Senha"
                        required
                        ></b-form-input>
                </b-form-group>
            </b-col>
        </b-row> -->
      <b-button :disabled="!edit" @click="updateUser" class="mr-2" variant="primary">Salvar Alterações</b-button>
      <b-button :disabled="!edit" @click="edit = false" type="reset" variant="danger">Cancelar</b-button>
      <hr>
    </b-form>
    <div class="d-flex justify-content-between">
        <b-button @click="edit = !edit" variant="warning"><i class="fas fa-edit"></i> Habilitar edição</b-button>
        <b-button v-b-modal.delete-user><i class="fas fa-trash"></i> Excluir a conta</b-button>
    </div>
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle';
import { key } from '@/config/global';
import axios from 'axios';

export default {
    name: 'Profile',
    components: { PageTitle },
    data: function() {
        return {
            user: {},
            edit: false,
            password: '',
            passwords: '',
        }
    },
    methods: {
        updateUser() {
            const {id, name, email, initiais } = this.user;
            const user = { name, email, initiais };
            
            axios.put(`/users/${id}`, user)
                .then(() => {
                    this.$toasts.success('Atualizado com sucesso!');
                    
                    setTimeout(() => {
                        localStorage.removeItem(key);
                        this.$store.commit('setUser', null);
                        this.$router.push({ path: '/' });
                    }, 3000)
                })
                .catch((e) => this.$toasts.error(e.response.data))
        },
        deleteUser() {
            axios.delete(`/users/${this.user.id}`, this.password)
                .then(() => {
                    this.$toasts.success('Essa conta foi removida.');
                    setTimeout(() => {
                        localStorage.removeItem(key);
                        this.$store.commit('setUser', null);
                        this.$router.push({ path: '/' });
                    }, 3000)
                    })
                    .catch((e) => this.$toasts.error(e.response.data))
                
        }
    },
    created() {
        const json = localStorage.getItem(key);
        this.user = JSON.parse(json);
    }
}
</script>

<style>

</style>