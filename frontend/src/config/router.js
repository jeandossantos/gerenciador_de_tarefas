import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        compoment: Home,
        name: 'Home'
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router