<template>
  <router-view />
</template>
<script setup>
import { useQuasar } from 'quasar';
import { watch } from 'vue';
import { useUserStore } from './store';

const $q = useQuasar();
const store = useUserStore();

watch(() => store.getMode, (_, newValue) => {
  $q.dark.set(newValue);
});

</script>
