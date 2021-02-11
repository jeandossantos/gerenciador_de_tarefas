<template>
  <b-container class="content">
    <transition mode="in-out">
        <router-view></router-view>
    </transition>
  </b-container>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content {
        grid-area: content;
        padding: 20px;
    }
</style>