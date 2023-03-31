<script setup>
import { useUserStore } from '../../../store/UserStore.js'

const store = useUserStore()
</script>

<template>
    <q-avatar rounded class="myIcon" size="200px">  <img :src="store.getAvatar"> </q-avatar> 
    <q-btn class="btnPassword" round icon="edit" color="primary"/>
    <span class="myUsername h1-text">{{ store.getUsername }}</span>
</template>

<style scoped>
.myUsername {
    position: absolute;
    top: 400px;
    left: 130px;
    font-size: 60px;
}
.myIcon {
    position: absolute;
    top: 200px;
    left: 25%;
}
.btnPassword {
    position: absolute;
    top: 350px;
    left: 55%;
}
</style>