<script setup>
import { moment, ms, useRouter, onMounted } from '../../utils';
import User from '../../schemas/query/user.gql';
import { viewUserStore } from '../../store';
import { runQuery } from '../../helpers/graphql.js'

const router = useRouter()
const store = viewUserStore()

onMounted(async () => {
    const { user } = await runQuery(User, { id: store.getId })
    store.user = user
})
</script>

<template>
    <div class="row">
        <q-btn class="btn" label="voltar" icon="chevron_left" color="primary" @click="router.push({ path: '/list' })" />
    </div>
    
    <q-card class="card">
        <q-separator spaced color="black" />
        <q-card-section class="avatar">
            <q-avatar size="130px"> <img :src="store.getUser.infos.avatar"> </q-avatar><span class="text-h1">Informações</span>
        </q-card-section>
        <q-list>
            <q-item-section>
                <q-item-label class="username">
                    <span class="text-h4"> <q-icon name="person"/> Username:</span>
                    <q-item-label>
                        <span class="text-h5"> {{ store.getUser.username }} </span>
                    </q-item-label>
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label class="role">
                    <span class="text-h4"><q-icon name="leaderboard"/> Cargo:</span>
                    <q-item-label>
                        <span class="text-h5"> {{ store.getUser.infos.role }} </span>
                    </q-item-label>
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label class="created">
                    <span class="text-h4"><q-icon name="calendar_month"/> Criado Em:</span>
                    <q-item-label>
                        <span class="text-h5"> {{ moment(ms(store.getUser.infos.created_at)).format('DD/MM/YYYY') }} </span>
                    </q-item-label>
                </q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-section>
                    <q-item-label class="langs">
                        <span class="text-h4">Linguagens: </span>
                        <q-item-label>
                            <q-btn-dropdown icon="lang" label="Ver">
                                <q-list v-for="lang in store.getUser.languages" :key="lang">
                                    <q-item-section>
                                        <q-btn color="grey">
                                            <q-icon><img :src="lang.id.replace('1', '/js.png').replace('2', '/python.png').replace('3', '/typescript.png')"></q-icon>{{ lang.name }}</q-btn>
                                    </q-item-section>
                                </q-list>
                                <q-list v-show="store.getUser.languages.length == 0">
                                    <q-btn color="grey" icon="error" label="Não possui" />
                                </q-list>
                            </q-btn-dropdown>
                        </q-item-label>
                    </q-item-label>
                </q-item-section>
                <q-item-label class="description">
                    <span class="text-h4"><q-icon name="description"/> Descrição:</span>
                    <q-item-label>
                        <q-input v-model="store.getUser.infos.description" class="inputDesc" type="textarea"></q-input>
                    </q-item-label>
                </q-item-label>
            </q-item-section>
        </q-list>
    </q-card>
</template>

<style scoped>
.inputDesc {
    background-color: white;
    width: 780px;
}

.card {
    background-color: gray;
    width: 800px;
    height: 1000px;
}

.avatar {
    position: absolute;
    top: 200px;
}

.username {
    position: absolute;
    top: 400px;
    left: 10px;
}

.role {
    position: absolute;
    top: 500px;
    left: 10px;
}

.created {
    position: absolute;
    top: 600px;
    left: 10px;
}

.langs {
    position: absolute;
    top: 680px;
    left: 10px;
}

.description {
    position: absolute;
    top: 780px;
    left: 10px;
}
</style>