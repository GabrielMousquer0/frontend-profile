<script setup>
import { useRouter } from 'vue-router';
import moment from 'moment';
import ms from 'ms';
import InputSearch from './InputSearch.vue';
import { viewUserStore, useUserStore } from '../../store';
import { runQuery } from '../../helpers';
import Users from '../../schemas/query/users.gql';

const user = useUserStore();
const store = viewUserStore();
const router = useRouter();

const result = runQuery(Users, {}, 'cache-and-network');

function viewUser(id) {
  store.user_id = id;
  return router.push({
    name: 'View',
    params: {
      id
    }
  });
}
</script>

<template>
  <div class="row full-width justify-rigth">
    <q-btn
      label="voltar"
      icon="chevron_left"
      color="primary"
      @click="router.push({ name: 'User', params: { id: user.getUser.id } })"
    />
  </div>
  <div
    v-if="result"
    class="list-user"
  >
    <div class="row full-width justify-end">
      <input-search />
    </div>
    <q-list
      v-for="todo in result.data.value?.users"
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
    height: 30vw;
}
</style>