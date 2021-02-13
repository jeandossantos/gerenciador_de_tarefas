<template>
    <div class="home">
        <PageTitle icon="fas fa-home" title="Bem vindo(a) ao NovaTask" subtitle="Deixando sua vida mais organizada." />
        <h3 class="text-center">Stat</h3>
        <MonthlyIncome v-if="loaded" :chartData="stat" />
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle';
import MonthlyIncome from '../templates/MonthlyIncome';
import axios from 'axios';

export default {
    name: 'Home',
    components: { PageTitle, MonthlyIncome },
    data: function() {
        return {
            stat: {},
            loaded: false,
        }
    },
    methods: {
        async loadStat() {
            try {
                this.loaded = false;
                const rs = await axios('/stats');
                this.stat = rs.data;
                this.loaded = true;
            } catch (e) {
                this.loaded = false;
            }
        }
    },
    mounted() {
        this.loadStat();
    }
}
</script>

<style>

</style>