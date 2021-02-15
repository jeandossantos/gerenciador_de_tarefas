<template>
  <div class="header d-flex justify-content-between align-items-center">
      <h1><img src="@/assets/imgs/icon.png" alt="NovaTask"></h1>
      <UserDropDown v-if="showDropDown" />
  </div>
</template>

<script>
import UserDropDown from "./UserDropDown";
export default {
    name:'Header',
    components: { UserDropDown },
    props: ["showDropDown"]
}
</script>

<style>
    .header {
        grid-area: header;
        background-color:#00bf8f;
        padding: 0 0 0 20px;
    }

    .header h1 {
        color: #fff;
    }
</style>