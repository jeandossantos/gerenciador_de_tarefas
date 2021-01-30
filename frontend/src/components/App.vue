<template>
  <div id="app">
    <Header />
    <Menu />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from './templates/Header';
import Menu from './templates/Menu';
import Content from './templates/Content';
import Footer from './templates/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Content,
    Footer
  }
}
</script>

<style>

body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 1.2rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  grid-template-rows: 60px 1fr 60px;
  grid-template-columns: 250px 1fr;
  grid-template-areas: 
    "menu header"
    "menu content"
    "menu header"
    ;
}
</style>
