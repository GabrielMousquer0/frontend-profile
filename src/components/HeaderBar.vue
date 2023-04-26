<script setup>
import { routerStore } from '../store';

const store = routerStore();
</script>

<template>
  <q-layout
    view="lHh lpr lFf"
    container
    class="layout"
  >
    <q-header elevated>
      <q-toolbar class="q-ma-md justify-center">
        <q-avatar
          size="100px"
          icon="person"
        />
        <span class="textStyle text-h1">{{ store.getName }} Profile</span>
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