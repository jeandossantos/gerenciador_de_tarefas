<template>
  <div class="footer">
      <p><strong>NovaTask - {{ new Date().getFullYear() }}</strong></p>
  </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #00bf8f;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer p {
        margin: 0;
    }
</style>