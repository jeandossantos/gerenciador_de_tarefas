<template>
  <div id="app">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from './templates/Header';
import Content from './templates/Content';
import Footer from './templates/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Content,
    Footer
  },
  data: function() {
    return {

    }
  },
  methods: {
    
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
