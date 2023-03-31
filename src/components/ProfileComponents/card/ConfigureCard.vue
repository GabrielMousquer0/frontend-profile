<script setup>
import { useUserStore } from '../../../store/UserStore';
import { edit } from '../../../schemas/'
import { ref, useQuasar, useMutation } from '../../../utils/'

const store = useUserStore()
const usernameEdit = ref(store.getUsername)
const emailEdit = ref(store.getEmail)
const passwordEdit = ref(store.getPassword)
const { notify } = useQuasar()

const { execute } = useMutation(edit)

function editButton(username, email, password, id) {
    if(username === store.getUsername|| !username && email === store.getEmail || !email && password === store.getPassword || !password) return notify({message: 'Preencha o campo', icon: 'warning', color: 'negative'})
if(username !== store.getUsername) {
        execute({
            username,
            id
        }).then(({data}) => {
            return notify({message: `User alterado para: ${username}`, icon: 'check', color: 'positive'})
        })
}
if(email !== store.getEmail) {
        execute({
            email,
            id
        }).then(({data}) => {
            return notify({message: `E-mail alterado para: ${email}`, icon: 'check', color: 'positive'})
        })
} 
if(password !== store.getPassword) {
        execute({
            password,
            id
        }).then(({data}) => {
            return notify({message: `Senha alterado para: ${password}`, icon: 'check', color: 'positive'})
        })
}
}
</script>

<template>
    <span class="my-configs h1-text">Configs</span>
        <q-input v-model="usernameEdit" rounded outlined class="configUsername" :label="'Username: ' + store.getUsername"/> <q-btn @click="editButton(usernameEdit, emailEdit, passwordEdit, store.getId)" class="btnUsername" round icon="edit" color="transparent"/>
        <q-input v-model="emailEdit" rounded outlined class="configEmail" :label="'E-mail: ' + store.getEmail"/> <q-btn @click="editButton(usernameEdit, emailEdit, passwordEdit, store.getId)" class="btnEmail" round icon="edit" color="transparent"/>
        <q-input v-model="passwordEdit" rounded outlined class="configPassword" :label="'Senha: ' + store.getPassword"/> <q-btn @click="editButton(usernameEdit, emailEdit, passwordEdit, store.getId)" class="btnPassword" round icon="edit" color="transparent"/>
</template>

<style scoped>
.my-configs {
    position: absolute;
    top: 470px;
    left: 0;
    font-size: 40px;
}
.configUsername {
    position: absolute;
    top: 550px;
    left: 20px;
}
.configEmail {
    position: absolute;
    top: 630px;
    left: 20px;
}
.configPassword {
    position: absolute;
    top: 710px;
    left: 20px;
}

.btnUsername {
    position: absolute;
    top: 560px;
    left: 230px;
}
.btnEmail {
    position: absolute;
    top: 640px;
    left: 230px;
}
.btnPassword {
    position: absolute;
    top: 720px;
    left: 230px;
}
</style>