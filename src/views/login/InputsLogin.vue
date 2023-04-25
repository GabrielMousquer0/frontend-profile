<script setup>
import LoginProfile from '../../components/Login/LoginProfile.vue'
import HeaderBar from '../../components/HeaderBar.vue';
</script>

<template>
    <HeaderBar/>
    <span class="row fixed-center">
    		<LoginProfile />
        </span>
</template>

<style scoped>
.inputLogin {
    height: 80px;
    width: 320px;
}

.pointer {
    position: absolute;
    left: 300px;
    bottom: 70px;
}

.registerText {
    position: absolute;
    top: 200px;
    left: 86px;
}
</style>
 