<script setup>
import { useRouter } from 'vue-router';
import { useUserStore, viewUserStore } from '../../store';

const user = viewUserStore();
const store = useUserStore();
const router = useRouter();

function viewUsers() {
  return router.push({
    path: '/list',
  });
}

function configs() {
  return router.push({
    name: 'configsUser'
  });
}

function logout() {
  user.$reset();
  store.$reset();
  router.push({
    path: '/',
  });
}
</script>

<template>
  <q-btn-dropdown
    color="primary"
    class="btnMenu"
    label="Menu"
    icon="menu"
  >
    <q-list>
      <q-item-section>
        <q-btn
          @click="viewUsers"
          label="Usuários"
          icon="person_search"
        />
        <q-btn 
          @click="configs"
          label="Configurações"
          icon="manage_accounts"
        />
        <q-btn
          @click="logout"
          label="logout"
          icon="logout"
        />
      </q-item-section>
    </q-list>
  </q-btn-dropdown>
</template>