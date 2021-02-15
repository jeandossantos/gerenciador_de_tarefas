<template>
  <div id="app">
    <Header :showDropDown="isDropDownVisible" :user="user" />
    <Loading v-if="validatingToken" />
    <Content v-else/>
    <Footer />
  </div>
</template>

<script>
import { key } from '@/config/global';
import axios from 'axios';
import { mapState } from 'vuex';

import Header from './templates/Header';
import Content from './templates/Content';
import Footer from './templates/Footer';
import Loading from './templates/Loading';


export default {
  name: 'App',
  components: {
    Header,
    Content,
    Footer,
    Loading
  },
  computed: mapState(["user", "isDropDownVisible"]),
  data: function() {
    return {
      validatingToken: true
    }
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;
      
      this.$store.commit('setUser', null);
      const data = localStorage.getItem(key);
      const userData = JSON.parse(data);

      if(!userData) {
        this.validatingToken = false;
        this.$router.push({ path: '/'}).catch(() => {});
        return
      }
        
      const rs = await axios.post('/validatetoken', userData);

      if(rs.data) {
        this.$store.commit('setUser', userData);
      } else {
        localStorage.removeItem(key);
        this.$router.push({ path: '/'}).catch(() => {});
      }

      this.validatingToken = false;
    }
  },
  created() {
    this.validateToken();
  }
}
</script>

<style>

body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 1.2rem;
  background-color: #efefef;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;

  display: grid;
  grid-template-rows: 60px 1fr 60px;
  grid-template-columns: 250px 1fr;
  grid-template-areas: 
    "header header"
    "content content"
    "footer footer";
}
</style>
