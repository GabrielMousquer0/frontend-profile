<script setup>
import { ref, useQuasar, useRouter } from '../../utils';
import { viewUserStore } from '../../store';
import SearchUsers from '../../schemas/mutation/searchUsers.gql';
import { runMutation } from '../../helpers/graphql';

const searchInput = ref('');
const { notify } = useQuasar();
const router = useRouter();
const store = viewUserStore();


async function searchBtn(username) {
  if (!username) return notify({ message: 'Me dê um username', color: 'orange', icon: 'warning' });

  const { searchUsers } = await runMutation(SearchUsers, { username });
  if (searchUsers.length == 0) {
    return notify({ message: 'Nenhum user encontrado!', icon: 'warning', color: 'negative' });
  }

  store.user_username = username;
  return router.push({
    name: 'searchUser',
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