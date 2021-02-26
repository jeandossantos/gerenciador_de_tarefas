<template>
    <div class="profile">
         <b-modal
        hide-footer
        id="update-password"
        title="Mudança de senha"
        centered>
            <form>
                <b-form-group
                label="Senha Atual:"
                label-for="old-password"                
                >
                <b-form-input
                    id="oldPassword"
                    type="password"
                    v-model="passwords.oldPassword"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                label="Nova Senha:"
                label-for="newPassword"                
                >
                <b-form-input
                    id="newPassword"
                    type="password"
                    v-model="passwords.newPassword"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                label="Confirme a nova Senha:"
                label-for="confirmNewPassword"                
                >
                <b-form-input
                    id="confirmNewPasswordt"
                    type="password"
                    v-model="passwords.confirmNewPassword"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <b-button @click.prevent="updatePassword" variant="outline-danger" class="mr-2">Mudar a Senha</b-button>
            <b-button @click="hideModal('update-password')" variant="outline-secondary">Cancelar</b-button>
        </b-modal>
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
                label-for="password"                
                >
                <b-form-input
                    id="password-input"
                    type="password"
                    v-model="password"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <b-button @click.prevent="removeUser" variant="outline-danger" class="mr-2">Sim, exclua minha conta</b-button>
            <b-button @click="hideModal('delete-user')" variant="outline-secondary">Cancelar</b-button>
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
      <b-button :disabled="!edit" @click="updateUser" variant="primary">Salvar Alterações</b-button>
      <b-button :disabled="!edit" class="ml-2 mr-2" @click="edit = false" type="reset">Cancelar</b-button>
      <b-button :disabled="!edit" v-b-modal.update-password variant="danger">Editar Senha</b-button>      
      <hr>
    </b-form>
    <div class="d-flex justify-content-between">
        <b-button @click="edit = true" variant="warning"><i class="fas fa-edit"></i> Habilitar edição</b-button>
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
            passwords: {},
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
                        this.$router.push({ path: '/' }).catch(() => {});
                    }, 3000)
                })
                .catch((e) => this.$toasts.error(e.response.data))
        },
        removeUser() {
            const url  = `/users/${this.user.id}`;
            const password = this.password;
            axios.defaults.headers.userPassword = password;
            axios.delete(url)
                .then(() => {
                    this.$toasts.success('Essa conta foi removida.');
                    setTimeout(() => {
                        localStorage.removeItem(key);
                        this.$store.commit('setUser', null);
                        this.$router.push({ path: '/' }).catch(() => {});
                    }, 3000)
                    })
                    .catch((e) => this.$toasts.error(e.response.data))
                
        },
        updatePassword() {
            axios.put(`/users/update/${this.user.id}`, this.passwords)
                .then(() => { 
                    this.$toasts.success('Senha alterada com sucesso!');
                    setTimeout(() => {
                        localStorage.removeItem(key);
                        this.$store.commit('setUser', null);
                        this.$router.push({ path: '/' }).catch(() => {});
                    }, 3000)
                    })
                    .catch((e) => this.$toasts.error(e.response.data))
        },
        hideModal(id) {
            this.$bvModal.hide(id)
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