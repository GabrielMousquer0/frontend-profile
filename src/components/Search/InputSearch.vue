<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { viewUserStore } from '../../store';
import { runMutation, negativeNotify } from '../../helpers';
import SearchUsers from '../../schemas/mutation/searchUsers.gql';

const searchInput = ref('');
const router = useRouter();
const store = viewUserStore();


async function searchBtn(username) {
  if (!username) return negativeNotify('Me dê um username');

  const { searchUsers } = await runMutation(SearchUsers, { username });
  if (searchUsers.length == 0) {
    return negativeNotify('Nenhum user encontrado!');
  }

  store.user_username = username;
  return router.push({
    path: '/search/:username',
    params: { username }
  });
}
</script>

<template>
  <q-input
    v-model="searchInput"
    filled
    type="search"
    label="Procure por um username"
    class="search-input"
  >
    <template #append>
      <q-icon
        name="search"
        @click="searchBtn(searchInput)"
      />
    </template>
  </q-input>
</template>

<style scoped>
.search-input {
    width: 16rem;
}
</style>