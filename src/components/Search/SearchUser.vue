<script setup>
import InputSearch from './InputSearch.vue';
import { useQuery, moment, ms, useRouter } from '../../utils';
import { viewUserStore, useUserStore } from '../../store';
import { searchUser } from '../../schemas';

const user = useUserStore()
const router = useRouter()
const store = viewUserStore()

const { data } = useQuery({
    query: searchUser,
    variables: { username: store.getUsername }
})

function viewUser(id) {
    store.view_user_id = id
    return router.push({
        name: 'viewUser',
        params: {
            id
        }
    })
}
</script>

<template>
    <div v-if="data" class="list-user">
        <div>
            <q-btn label="voltar" icon="chevron_left" color="primary" @click="router.push({ path: '/list' })" />
        </div>
        <div class="row full-width justify-end">
            <input-search/>
        </div>
        <q-list v-for="todo in data.searchUser" :key="todo">
            <q-separator spaced color="black" class="separator"/>
            <q-item>
                <q-item-section>
                    <q-item-label class="avatar">
                        <q-avatar> <img :src="todo.avatar" alt=""> </q-avatar>
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
                        <span class="text-subtitle1">Cargo: {{ todo.role }}</span>
                    </q-item-label>
                </q-item-section>
                <q-separator/>
                <q-item-section>
                    <q-item-label class="created">
                        <span class="text-subtitle1">Criou: {{ moment(ms(todo.created_at)).format('DD/MM/YYYY') }}</span>
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
    <div v-show="!data">
        Não foi possivel encontrar nenhum usuario
        <router-link to="/list">Clique Aqui</router-link>
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