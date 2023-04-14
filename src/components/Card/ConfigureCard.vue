<script setup>
import { useUserStore } from '../../store';
import { EmailUpdate, PasswordUpdate, UsernameUpdate } from '../../schemas/'
import { ref, useQuasar, useMutation } from '../../utils/'

const store = useUserStore()
const usernameEdit = ref('')
const emailEdit = ref('')
const passwordEdit = ref('')
const { notify } = useQuasar()

const emailUp = useMutation(EmailUpdate)
const usernameUp = useMutation(UsernameUpdate)
const passwordUp = useMutation(PasswordUpdate)

function editUsername(username, id) {
    console.log(id)
    if(!username) return notify({ message: 'Preencha o campo', icon: 'warning', color: 'warning'})
    usernameUp.execute({
            username,
            id
        }).then(({data}) => {
            store.user_username = username
            return notify({message: `User alterado para: ${username}, atualize a pagina!`, icon: 'check', color: 'positive'})
        })

}
function editEmail(email, id) {
    if(!email) return notify({ message: 'Preencha o campo', icon: 'warning', color: 'warning' })
    console.log(emailUp.execute())
        emailUp.execute({
            email,
            id
        }).then(({data}) => {
            return notify({message: `E-mail alterado para: ${email}`, icon: 'check', color: 'positive'})
        })

}
function editPassword(password, id) {
    if(!password) return notify({ message: 'Preencha o campo', icon: 'warning', color: 'warning'})
        passwordUp.execute({
            password,
            id
        }).then(({data}) => {
            return notify({message: `Senha alterado para: ${password}`, icon: 'check', color: 'positive'})
        })
}
</script>

<template>
    <span class="my-configs h1-text">Configs</span>
        <q-input v-model="usernameEdit" rounded outlined class="configUsername" label="Username"/> <q-btn @click="editUsername(usernameEdit, store.getId)" class="btnUsername" round icon="edit" color="transparent"/>
        <q-input v-model="emailEdit" rounded outlined class="configEmail" label="E-mail"/> <q-btn @click="editEmail(emailEdit, store.getId)" class="btnEmail" round icon="edit" color="transparent"/>
        <q-input v-model="passwordEdit" rounded outlined class="configPassword" label="Senha"/> <q-btn @click="editPassword(passwordEdit, store.getId)" class="btnPassword" round icon="edit" color="transparent"/>
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