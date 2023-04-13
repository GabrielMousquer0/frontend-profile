<script setup>
import { useQuery, moment, ms } from '../../utils';
import { viewUser, userLanguages } from '../../schemas';
import { viewUserStore } from '../../store';

const store = viewUserStore()
const { data } = useQuery({
    query: viewUser,
    variables: { id: store.getId }
})
const languages = useQuery({
    query: userLanguages,
    variables: { id: store.getId }
})

const array = ['a', 'b']
</script>

<template>
    <div v-if="data">
        <q-card class="card">
            <q-separator spaced color="black" />
            <q-card-section class="avatar">
                <q-avatar size="130px"> <img :src="data.viewUser.avatar"> </q-avatar><span class="text-h1">Informações</span>
            </q-card-section>
            <q-list>
                <q-item-section>
                    <q-item-label class="username">
                        <span class="text-h4"> <q-icon name="person"/> Username:</span>
                        <q-item-label>
                            <span class="text-h5"> {{ data.viewUser.username }} </span>
                        </q-item-label>
                    </q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-item-label class="role">
                        <span class="text-h4"><q-icon name="leaderboard"/> Cargo:</span>
                        <q-item-label>
                            <span class="text-h5"> {{ data.viewUser.role }} </span>
                        </q-item-label>
                    </q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-item-label class="created">
                        <span class="text-h4"><q-icon name="calendar_month"/> Criado Em:</span>
                        <q-item-label>
                            <span class="text-h5"> {{ moment(ms(data.viewUser.created_at)).format('DD/MM/YYYY') }} </span>
                        </q-item-label>
                    </q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-item-section>
                        <q-item-label class="langs">
                            <span class="text-h4">Linguagens: </span>
                            <q-item-label>
                                <q-btn-dropdown icon="lang" label="Ver">
                                    <q-list v-for="lang in languages.data.value.languagesUser.languages" :key="lang">
                                        <q-item-section>
                                            <q-btn color="grey">
                                                <q-icon><img :src="lang.id.replace('1', '/js.png').replace('2', '/python.png').replace('3', '/typescript.png')"></q-icon>{{ lang.name }}</q-btn>
                                        </q-item-section>
                                    </q-list>
                                </q-btn-dropdown>
                            </q-item-label>
                        </q-item-label>
                    </q-item-section>
                    <q-item-label class="description">
                        <span class="text-h4"><q-icon name="description"/> Descrição:</span>
                        <q-item-label>
                            <q-input v-model="data.viewUser.description" class="inputDesc" type="textarea"></q-input>
                        </q-item-label>
                    </q-item-label>
                </q-item-section>
            </q-list>
        </q-card>
    </div>
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