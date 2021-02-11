import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/home/Home';
import Signin from '../components/signin/Signin';
import Signup from '../components/signup/Signup';
import Task from '../components/task/Task';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Task,
        name: 'Task'
    },
    {
        path: '/',
        component: Signin,
        name: 'Signin'
    },
    {
        path: '/signup',
        component: Signup,
        name: 'Signup'
    },
    {
        path: '/home',
        component: Home,
        name: 'Home'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;