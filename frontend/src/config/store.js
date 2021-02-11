import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.Authorization = " bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkplYW4gZG9zIFNhbnRvcyIsImluaXRpYWlzIjoiSlMiLCJlbWFpbCI6ImplYW5kZGdAaG90bWFpbC5jb20iLCJhZG1pbiI6ZmFsc2V9.h3x-kTks5RapPxrAhiiqJcTYDwB_jMdkEj08-UjfTc0";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        dailyTasks: [],
        dailyTasksCount: 0,
        dailyTasksLimit: 0,
        allTasks: [],
        allTasksCount: 0,
        allTasksLimit: 0
    },
    mutations: {
        setDailyTasks(state, payload) {
            state.dailyTasks = payload.data;
            state.dailyTasksCount = payload.count;
            state.dailyTasksLimit = payload.limit;
        },
        setAllTasks(state, payload) {
            state.allTasks = payload.data;
            state.allTasksCount = payload.count;
            state.allTasksLimit = payload.limit;
        }
    },
    actions: {
        save(context, payload) {
            const url = payload.task.id ? `/tasks/${payload.task.id}` : '/tasks';
            const method = payload.task.id ? 'put' : 'post';

            axios[method](url, payload.task)
              .then(() => {
                context.dispatch('loadDailyTasks');
                context.dispatch('loadAllTasks');
                payload.reset();
              })

        },
        loadDailyTasks(context, payload) {
            const data = { ...payload };
            axios(`/tasks/daily?page=${data.page|| 1}&search=${data.search || ''}`)
                .then(resp => {
                    context.commit('setDailyTasks', resp.data);
                })
                .catch(e => console.log(e.response.data))
        },
        loadAllTasks(context, payload) {
            const data = {...payload };

            axios(`/tasks?page=${data.page || 1}&search=${data.search || ''}`)
                .then(resp => {
                    context.commit('setAllTasks', resp.data);
                })
        },
        remove(context, id) {
            axios.delete(`/tasks/${id}`)
            .then(() => {
                context.dispatch('loadDailyTasks');
                context.dispatch('loadAllTasks');
            })
        },
        finished(context, id) {
            axios.post(`/tasks/finish/${id}`)
            .then(() => {
                context.dispatch('loadDailyTasks');
                context.dispatch('loadAllTasks');
            })
        }
    }
})

Promise.all([
    store.dispatch('loadDailyTasks'),
    store.dispatch('loadAllTasks')
])

export default store;