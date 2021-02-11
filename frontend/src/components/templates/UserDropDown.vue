<template>
    <div class="user-dropdown">
        <div class="user-button">
            <div class="user-name mr-2 text-center"><strong>Jean dos Francisco dos Santos</strong></div>
            <div class="user-initiais d-flex justify-content-center align-items-center">JS</div>
            <div class="user-icon ml-2"><i class="fas fa-chevron-down"></i></div>
        </div>
        <div class="dropdown-content">
            <router-link to="/"><i class="fas fa-home"></i> Home</router-link>
            <router-link to="/"><i class="fas fa-tasks"></i> Tarefas</router-link>
            <router-link to="/"><i class="fas fa-user-circle"></i> Profile</router-link>
            <router-link to="/"><i class="fas fa-sign-out-alt"></i> Sair</router-link>
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
        right: 5px;
    }

    .user-dropdown .user-button .user-initiais {
        background-color: #fff;
        border-radius: 50%;
        min-width: 50px;
        min-height: 50px;
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

    @media only screen and (max-width: 600px) {
            .user-dropdown .user-name {
                display: none;
            }
    }

</style>