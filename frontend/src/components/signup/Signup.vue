<template>
  <div class="signup d-flex justify-content-center align-items-center">
      <b-form >
          <h1 class="text-center">Signup</h1>
          <b-row>
              <b-col sm="8">
                <b-form-group
                label="Nome:"
                label-for="user-name"
                >
                    <b-form-input
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
            v-model="user.email"
            type="email"
            placeholder="Insira seu E-mail"
            required
            ></b-form-input>
        </b-form-group>
      <b-form-group id="user-password" label="Senha:" label-for="user-password">
            <b-form-input
            type="password"
            id="user-password"
            v-model="user.password"
            placeholder="Insira sua Senha"
            required
            ></b-form-input>
      </b-form-group>
      <b-form-group id="user-confirmPassword" label="Confirmação de Senha:" label-for="user-confirmPassword">
            <b-form-input
            type="password"
            id="user-confirmPassword"
            v-model="user.confirmPassword"
            placeholder="Confime sua Senha"
            required
            ></b-form-input>
      </b-form-group>
      <b-button type="submit"  class="mr-2" variant="primary">Criar</b-button>
      <b-button type="reset" variant="danger">Cancelar</b-button>
      <hr>
    <p class="text-center small"><router-link to="/">Voltar</router-link></p>
    </b-form>
    
  </div>
</template>

<script>
export default {
    name: 'Signup',
    data: function() {
        return {
            user: {}
        }
    },
    methods: {
        reset() {
            this.user = {};
        }
    }
}
</script>

<style scoped>
    .signup {
        height: 100%;
    }
    .signup > form {
        width: 380px;
        background-color: #fff;
        padding: 10px 20px 20px 20px;
        border-radius: 8px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    }

    .signup form > p.text-center {
        color: #8aab90;
    }
    
</style>