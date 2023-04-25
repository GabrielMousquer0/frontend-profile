<script setup>
import InputSearch from './InputSearch.vue';
import { moment, ms, useRouter, onMounted, ref } from '../../utils'
import { runQuery } from '../../helpers/graphql';
import Users from '../../schemas/query/users.gql'
import { viewUserStore, useUserStore } from '../../store';

const user = useUserStore()
const store = viewUserStore()
const router = useRouter()

onMounted(async () => {
    const { users } = await runQuery(Users)
    store.users = users
})

function viewUser(id) {
    store.user_id = id
    return router.push({
        name: 'viewUser',
        params: {
            id
        }
    })
}
</script>

<template>
    <div class="row full-width justify-rigth">
        <q-btn label="voltar" icon="chevron_left" color="primary" @click="router.push({ name: 'ProfileUser', params: { id: user.getId } })" />
    </div>
    <div v-if="store.getUsers" class="list-user">
        <div class="row full-width justify-end">
            <input-search/>
        </div>
        <q-list v-for="todo in store.getUsers" :key="todo">
            <q-separator spaced color="black" class="separator" />
            <q-item>
                <q-item-section>
                    <q-item-label class="avatar">
                        <q-avatar> <img :src="todo.infos.avatar" alt=""> </q-avatar>
                    </q-item-label>
                </q-item-section>
                <q-separator />
                <q-item-section>
                    <q-item-label>
                        <span class="text-subtitle1">User: {{ todo.username }}</span>
                    </q-item-label>
                </q-item-section>
                <q-separator/>
                <q-item-section>
                    <q-item-label class="id">
                        <span class="text-subtitle1">Id: {{ todo.id }}</span>
                    </q-item-label>
                </q-item-section>
                <q-separator/>
                <q-item-section>
                    <q-item-label class="role">
                        <span class="text-subtitle1">Cargo: {{ todo.infos.role }}</span>
                    </q-item-label>
                </q-item-section>
                <q-separator/>
                <q-item-section>
                    <q-item-label class="created">
                        <span class="text-subtitle1">Criou: {{ moment(ms(todo.infos.created_at)).format('DD/MM/YYYY') }}</span>
                    </q-item-label>
                </q-item-section>
                <q-item-section class="button">
                    <q-item-label class="row full-width justify-end">
                        <q-btn icon="search" color="primary" @click="viewUser(todo.id)" />
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<style scoped>
.separator {
    width: 2690%;
}

.list-user {
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100vw;
}
</style>