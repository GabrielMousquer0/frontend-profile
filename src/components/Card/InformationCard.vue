<script setup>
import { useUserStore } from '../../store';
import { ref, useQuasar } from '../../utils/';
import { EditAvatar } from '../../schemas/mutation/EditAvatar.gql';
import { runMutation, runQuery } from '../../helpers/graphql';

const store = useUserStore();
const username =
    store.getUsername.length < 10 ?
    store.getUsername :
    store.getUsername.slice(0, 10) + '...';
const avatarURL = ref('');
const { notify } = useQuasar();

async function urlSend(avatar, id) {
    if (!avatar)
        return notify({
            message: 'Você deve me dar uma url',
            icon: 'warning',
            color: 'negative',
        });
    try {
        const { editAvatar } = await runMutation(EditAvatar, { avatar, id })
        return notify({
            message: 'Foto de perfil alterada com sucesso',
            icon: 'check',
            color: 'positive',
        });
    } catch {
        return notify({
            message: 'Me dê uma url valida!',
            icon: 'warning',
            color: 'orange',
        });
    }
}
</script>

<template>
    <div class="avatar row justify-center">
        <q-avatar rounded class="myIcon" size="200px"> <img :src="store.getAvatar"> </q-avatar>
        <div class="row column justify-end">
            <q-btn class="button" round icon="edit" color="primary">
                <q-popup-edit v-model="avatarURL" v-slot="scope">
                    <q-input v-model="avatarURL" hint="Me dê uma URL de alguma imagem" rounded dense @keyup.enter="scope.set">
                        <q-btn class="iconSend" flat @click="urlSend(avatarURL, store.getId)" icon="add" /> </q-input>
                </q-popup-edit>
            </q-btn>
        </div>
    </div>
</template>

<style scoped>
.avatar {
    margin-top: 4rem;
    margin-bottom: 8.7rem;
}

.button {
    height: 1rem;
    width: 10px;
}
</style>