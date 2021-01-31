<template>
    <div class="user-dropdown">
        <div class="user-button">
            <div class="user-name mr-2">Jean dos Santos</div>
            <div class="user-initiais d-flex justify-content-center align-items-center">JS</div>
        </div>
        <div class="dropdown-content">
            <router-link to="/">Home</router-link>
            <router-link to="/">Tarefas</router-link>
            <router-link to="/">Profile</router-link>
            <router-link to="/">Sair</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserDropDown'
}
</script>

<style>

    .user-dropdown {
        height: 100%;
        position: relative;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .user-dropdown .user-button {
        display: flex;
        height: 100%;
        color: #fff;
        align-items: center;
        padding: 0 20px;
    }

    .user-dropdown .dropdown-content {
        display: none;
        position: absolute;
    }

    .user-dropdown .user-button .user-initiais {
        background-color: #fff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-weight: 900;
        color: #777;
        padding: 10px;
        overflow: hidden;
    }

    .user-dropdown:hover {
        background-color:#189a79;
        transition: 0.5s;
        cursor: pointer;
    }

    .user-dropdown:hover .dropdown-content {
        display: flex;
        flex-direction: column;
        min-width: 230px;
        background-color: #f7f7f7;
        border-radius: 5px;
        transition: 0.5s;
        box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
        
    }

    .user-dropdown .dropdown-content:hover {
        margin-top: 5px;
        transition: 0.5s;
    }

    .user-dropdown:hover  a {
        color: #777;
        text-decoration: none;
        padding: 5px 10px;
        border-bottom: 1px solid #e2e6e5;
    }

    .user-dropdown:hover  a:hover {
        background-color: #00bf8f;
        transition: 0.2s;
        color: #f7f7f7;
    }

</style>