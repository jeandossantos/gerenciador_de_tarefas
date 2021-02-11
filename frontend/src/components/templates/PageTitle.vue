<template>
  <div class="page-title">
    <h2 class="tittle"><i :class="icon"></i> {{ title }}</h2>
    <p class="subtitle">{{ subtitle }}</p>
    <hr>    
  </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['title', 'subtitle', 'icon']
}
</script>

<style scoped>

    .page-title h2{
        color: #777;
        margin-top: 5px;
        font-weight: 700;
    }

    .page-title p.subtitle {
      color:#adadad;
      font-weight: 700;
      font-size: 1.0rem;
    }
</style>