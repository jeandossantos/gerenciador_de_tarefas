import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/home/Home';
import Signin from '../components/signin/Signin';
import Signup from '../components/signup/Signup';
import Task from '../components/task/Task';
import Profile from '../components/profile/Profile';

import { key } from '@/config/global';

Vue.use(VueRouter);

const routes = [
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
    },
    {
        path: '/tasks',
        component: Task,
        name: 'Task'
    },
    {
        path: '/profile',
        component: Profile,
        name: 'Profile'
    }
];


const router = new VueRouter({
    mode: 'history',
    routes
});

const json = localStorage.getItem(key);
const routesName = routes.map(r => r.name);

router.beforeEach((to, from, next) => {
    if((to.name === 'Signin' || to.name === 'Signup') && json) {
        next({ name: 'Home' });
    } else if(routesName.includes(to.name)){
        next()
    } else {
        next({ name: 'Home' });
    }
});

export default router;