import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

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
        setUser(state, payload = null) {
          if(payload !== undefined) {
              state.user = payload;
          }

          if(state.user !== null) {
              state.isDropDownVisible = true;
              axios.defaults.headers.common['Authorization'] = `bearer ${state.user.token}`; 
          } else {
              state.isDropDownVisible = false;
              delete axios.defaults.headers.common['Authorization'];
          }
        },
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
        loadToken() {

        },
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

export default store;