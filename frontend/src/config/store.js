import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.Authorization = " bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkplYW4gZG9zIFNhbnRvcyIsImluaXRpYWlzIjoiSlMiLCJlbWFpbCI6ImplYW5kZGdAaG90bWFpbC5jb20iLCJhZG1pbiI6ZmFsc2V9.h3x-kTks5RapPxrAhiiqJcTYDwB_jMdkEj08-UjfTc0";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        isDropDownVisible: false,
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
            const msg = method === 'post' ? 'Tarefa Criada com sucesso!' : 'Tarefa editada com sucesso!';
            
            axios[method](url, payload.task)
              .then(() => {
                payload.alert.success(msg);
                payload.reset();
                context.dispatch('loadDailyTasks');
                context.dispatch('loadAllTasks');
              })
              .catch(e => payload.alert.error(e.response.data))

        },
        loadDailyTasks(context, payload) {
            const data = { ...payload };
            
            axios(`/tasks/daily?page=${data.page|| 1}&search=${data.search || ''}`)
                .then(resp => {
                    context.commit('setDailyTasks', resp.data);
                })
        },
        loadAllTasks(context, payload) {
            const data = {...payload };

            axios(`/tasks?page=${data.page || 1}&search=${data.search || ''}`)
                .then(resp => {
                    context.commit('setAllTasks', resp.data);
                })
        },
        remove(context, payload) {
            axios.delete(`/tasks/${payload.id}`)
            .then(() => {
                payload.alert.success('Tarefa removida!');
                context.dispatch('loadDailyTasks');
                context.dispatch('loadAllTasks');
            })
        },
        finished(context, payload) {
            axios.post(`/tasks/finish/${payload.id}`)
            .then(() => {
                payload.alert.success('Tarefa finalizada!');
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