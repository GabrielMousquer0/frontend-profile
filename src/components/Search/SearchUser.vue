<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
import ms from 'ms';
import InputSearch from './InputSearch.vue';
import { runMutation } from '../../helpers';
import { viewUserStore } from '../../store';
import SearchUsers from '../../schemas/mutation/searchUsers.gql';
const router = useRouter();
const store = viewUserStore();

onMounted(async () => {
  const { searchUsers } = await runMutation(SearchUsers, { username: store.getUsername });
  store.users_username = searchUsers;
});

async function viewUser(id) {
  store.user_id = id;
  return router.push({
    name: 'viewUser',
    params: {
      id
    }
  });
}
</script>

<template>
  <div
    class="list-user"
  >
    <div>
      <q-btn
        label="voltar"
        icon="chevron_left"
        color="primary"
        @click="router.push({ path: '/list' })"
      />
    </div>
    <div class="row full-width justify-end">
      <input-search />
    </div>
    <q-list
      v-for="todo in store.getUsersUsername"
      :key="todo"
    >
      <q-separator
        spaced
        color="black"
      />
      <q-item>
        <q-item-section>
          <q-item-label class="avatar">
            <q-avatar>
              <img
                :src="todo.infos.avatar"
                alt=""
              >
            </q-avatar>
          </q-item-label>
        </q-item-section>
        <q-separator />
        <q-item-section>
          <q-item-label>
            <span class="text-subtitle1">User: {{ todo.username }}</span>
          </q-item-label>
        </q-item-section>
        <q-separator />
        <q-item-section>
          <q-item-label class="id">
            <span class="text-subtitle1">Id: {{ todo.id }}</span>
          </q-item-label>
        </q-item-section>
        <q-separator />
        <q-item-section>
          <q-item-label class="role">
            <span class="text-subtitle1">Cargo: {{ todo.infos.role }}</span>
          </q-item-label>
        </q-item-section>
        <q-separator />
        <q-item-section>
          <q-item-label class="created">
            <span class="text-subtitle1">Criou: {{ moment(ms(todo.infos.created_at)).format('DD/MM/YYYY') }}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section class="button">
          <q-item-label class="row full-width justify-end">
            <q-btn
              icon="search"
              color="primary"
              @click="viewUser(todo.id)"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style scoped>


.list-user {
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100vw;
}
</style>