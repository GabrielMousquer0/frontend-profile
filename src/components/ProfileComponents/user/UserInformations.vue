<script setup>
import TecnologyUser from './profile/TecnologyUser.vue';
import InfoUser from './profile/InfoUser.vue';
import DescriptionUser from './profile/DescriptionUser.vue';
import { routerStore } from '../../../store/RouterStore'

const store = routerStore() 
store.router_name = 'User'
</script>

<template>
    <InfoUser/>
    <DescriptionUser/>
    <TecnologyUser/>
</template>