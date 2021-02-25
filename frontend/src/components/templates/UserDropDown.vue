<template>
    <div class="user-dropdown" @click="showDropDownContent = !showDropDownContent">
        <div class="user-button">
            <div class="user-name mr-2 text-center"><strong>{{ user.name }}</strong></div>
            <div class="user-initiais d-flex justify-content-center align-items-center">{{ user.initiais }}</div>
            <div class="user-icon ml-2"><i class="fas fa-chevron-down"></i></div>
        </div>
        <div v-if="showDropDownContent"  class="dropdown-content">
            <router-link to="/home"><i class="fas fa-home"></i> Home</router-link>
            <router-link to="/tasks"><i class="fas fa-tasks"></i> Tarefas</router-link>
            <router-link to="/profile"><i class="fas fa-user-circle"></i> Perfil</router-link>
            <a @click.prevent="signin" class="exit"><i class="fas fa-sign-out-alt"></i> Sair</a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { key } from '@/config/global';

export default {
    name: 'UserDropDown',
    computed: mapState(["user"]),
    data: function() {
        return {
            showDropDownContent: false
        }
    },
    methods: {
        signin() {
            localStorage.removeItem(key);
            this.$store.commit('setUser', null);
            this.$router.push({ path: '/' }).catch(() => {});
        }
    }
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
        display: flex;
        flex-direction: column;

        margin-top: 10px;
        position: absolute;
        right: 5px;
        min-width: 230px;
        background-color: #f7f7f7;
        border-radius: 5px;
        transition: 0.5s;
        box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
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

    .dropdown-content  a {
        color: #777;
        text-decoration: none;
        padding: 5px 10px;
        border-bottom: 1px solid #e2e6e5;
    }

    .dropdown-content  a:hover {
        background-color: #00bf8f;
        transition: 0.2s;
        color: #f7f7f7;
    }

    @media only screen and (max-width: 600px) {
            .user-dropdown .user-name {
                display: none;
            }
    }

    .dropdown-content a.exit {
        z-index: 1;
    }

    .dropdown-content a.exit:hover {
        background: #dc3545;
        
    }

</style>