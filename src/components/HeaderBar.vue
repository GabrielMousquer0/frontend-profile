<script setup>
import { computed, ref } from 'vue';
import { routerStore, useUserStore } from '../store';

const store = routerStore();
const userStore = useUserStore();

const iconStatus = ref(true);
const statusMode = {
  true: {
    type: 'dark_mode'
  },
  false: {
    type: 'light_mode'
  },
};

function tradeMode() {
  iconStatus.value = !iconStatus.value;
  userStore.tradeMode(iconStatus.value);
}
const mode = computed(() => statusMode[iconStatus.value]);
</script>

<template>
  <q-layout
    view="lHh lpr lFf"
    container
    class="layout"
  >
    <q-header elevated>
      <q-toolbar class="q-ma-md">
        <q-toolbar-title class="row justify-center">
          <q-avatar
            size="100px"
            icon="person"
          />
          <span class="textStyle text-h1">{{ store.getName }} Profile</span>
        </q-toolbar-title>

        <q-btn
          flat
          round
          @click="tradeMode"
          :icon="mode.type"
        />
      </q-toolbar>
    </q-header>
  </q-layout>
</template>

<style>
.layout {
    height: 8rem;
}

.textStyle {
    font-size: 5rem;
    font-family: "Open Sans", sans-serif;
}
</style>