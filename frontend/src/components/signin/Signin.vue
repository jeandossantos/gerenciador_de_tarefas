<template>
  <div class="signin d-flex justify-content-center align-items-center">
      <b-form>
          <h1 class="text-center">Signin</h1>
          <b-form-group
          label="E-mail:"
          label-for="login-email"
          >
            <b-form-input
            id="login-email"
            v-model="login.email"
            type="email"
            placeholder="Insira seu email"
            required
            ></b-form-input>
          </b-form-group>
          <b-form-group
          label="Password:"
          label-for="login-password"
          >
            <b-form-input
            id="login-password"
            v-model="login.password"
            type="password"
            placeholder="Insira sua senha"
            required
            ></b-form-input>
          </b-form-group>
          <b-button  @click="signin"  class="mr-2" variant="primary">Entrar</b-button>
          <b-button type="reset" variant="danger">Cancelar</b-button>
          <hr>
          <p class="text-center small">ou crie sua conta <router-link to="/signup">aqui</router-link></p>
    </b-form>
   
  </div>
</template>

<script>
import axios from 'axios';
import { key } from '@/config/global';

export default {
    name: 'Signin',
    data: function() {
        return {
            login: {}
        }
    },
    methods: {
        reset() {
            this.login = {};
        },
        signin() {
            axios.post('/signin', this.login)
                .then(resp => {
                    this.$store.commit('setUser', resp.data);
                    localStorage.setItem(key, JSON.stringify(resp.data));
                    this.$router.push({ path: '/home'});
                })
                .catch(e => this.$toasts.error(e.response.data))
        }
    }
}
</script>

<style scoped>
    .signin {
        height: 100%;
    }
    .signin > form {
        width: 380px;
        background-color: #fff;
        padding: 10px 20px 20px 20px;
        border-radius: 8px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    }

    .signin form > p.text-center {
        color: #8aab90;
    }
    
</style>