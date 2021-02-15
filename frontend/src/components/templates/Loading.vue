<template>
    <div class="loading d-flex justify-content-center align-items">
        <img src="@/assets/imgs/loading.gif" alt="Loading...">
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style>
    .loading {
        grid-area: content;
        height: 100%;
        align-items: center;
    }


    .loading img {
        width: 300px;
        height: 300px;
    }

</style>