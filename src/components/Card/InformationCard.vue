<script setup>
import { useUserStore } from '../../store';
import { ref, useMutation, useQuasar } from '../../utils/';
import { EditAvatar } from '../../schemas/mutation/EditAvatar.gql';

const store = useUserStore()
const username = store.getUsername.length < 10 ? store.getUsername : store.getUsername.slice(0, 10) + '...';
const avatarURL = ref('')
const { notify } = useQuasar()

const { execute } = useMutation(EditAvatar)

function iconSend(avatar, id) {
    if (!avatar) return notify({ message: 'Você deve me dar uma url', icon: 'warning', color: 'negative' })
    execute({
        avatar,
        id
    }).then(({ data }) => {
        store.user_avatar = data.editAvatar.avatar
        return notify({ message: 'Foto de perfil alterada com sucesso', icon: 'check', color: 'positive' })
    }).catch((e) => {
        return notify({ message: 'error: Me dê uma url menor!', icon: 'warning', color: 'orange' })
    })

}
</script>

<template>
    <q-avatar rounded class="myIcon" size="200px"> <img :src="store.getAvatar"> </q-avatar>
    <q-btn class="btnPassword" round icon="edit" color="primary">
        <q-popup-edit v-model="avatarURL" v-slot="scope">
            <q-input v-model="avatarURL" hint="Me dê uma URL de alguma imagem" rounded dense @keyup.enter="scope.set">
                <q-btn class="iconSend" flat @click="iconSend(avatarURL, store.getId)" icon="add" /> </q-input>
        </q-popup-edit>
    </q-btn>
    <span class="myUsername h1-text">{{ username }}</span>
</template>

<style scoped>
.iconSend {
    position: absolute;
    left: 141px;
}

.myUsername {
    position: absolute;
    top: 400px;
    left: 130px;
    font-size: 60px;
}

.myIcon {
    position: absolute;
    top: 200px;
    left: 25%;
}

.btnPassword {
    position: absolute;
    top: 350px;
    left: 55%;
}
</style>