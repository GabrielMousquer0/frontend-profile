<script setup>
import { useQuery, moment, ms } from '../../../../utils';
import { viewUser } from '../../../../schemas';
import { viewUserStore } from '../../../../store/viewUserStore';

const store = viewUserStore()
const { data } = useQuery({
    query: viewUser,
    variables: { id: store.getId }
})



</script>

<template>
<div v-if="data">
<q-card class="card">
    <q-separator spaced color="black"/>
    <q-card-section class="avatar">
            <q-avatar size="130px"> <img :src="data.viewUser.avatar"> </q-avatar><span class="text-h1">Informações</span>
    </q-card-section>
    <q-list>
        <q-item-section>
            <q-item-label class="username">
                <span class="text-h4">Username:</span>
            <q-item-label>
                <span class="text-h5"> {{ data.viewUser.username }} </span>
            </q-item-label>
            </q-item-label>
        </q-item-section>
        <q-item-section>
            <q-item-label class="role">
                <span class="text-h4">Cargo:</span>
            <q-item-label>
                <span class="text-h5"> {{ data.viewUser.role }} </span>
            </q-item-label>
            </q-item-label>
        </q-item-section>
        <q-item-section>
            <q-item-label class="created">
                <span class="text-h4">Criado Em:</span>
            <q-item-label>
                <span class="text-h5"> {{ moment(ms(data.viewUser.created_at)).format('DD/MM/YYYY') }} </span>
            </q-item-label>
            </q-item-label>
        </q-item-section>
        <q-item-section>
            <q-item-label class="description">
                <span class="text-h4">Descrição:</span>
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

.description {
    position: absolute;
    top: 780px;   
    left: 10px;
}
</style>