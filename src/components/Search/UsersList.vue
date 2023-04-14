<script setup>
import InputSearch from './InputSearch.vue';
import { useQuery, moment, ms, useRouter } from '../../utils'
import { users } from '../../schemas'
import { viewUserStore, useUserStore } from '../../store';

const user = useUserStore()
const store = viewUserStore()
const router = useRouter()
const { data } = useQuery({
    query: users,
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
    <div class="row full-width justify-rigth">
        <q-btn label="voltar" icon="chevron_left" color="primary" @click="router.push({ name: 'ProfileUser', params: { id: user.getId } })" />
    </div>
    <div v-if="data" class="list-user">
        <div class="row full-width justify-end">
            <input-search/>
        </div>
        <q-list v-for="todo in data.users" :key="todo">
            <q-separator spaced color="black" class="separator" />
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