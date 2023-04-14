<script setup>
import HeaderBar from './components/HeaderBar.vue';

</script>

<template>
    <div>
        <HeaderBar />
        <span class="row justify-center fixed-center">
                <router-view />
        </span>
    </div>
</template>
