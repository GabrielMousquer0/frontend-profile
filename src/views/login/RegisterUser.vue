<script setup>
import { useRoute } from 'vue-router';
import { ref, useMutation, Notify, useRouter } from '../../utils/'

const pswVisibility = ref(true)
const emailInput = ref('')
const usernameInput = ref('')
const passwordInput = ref('')
const confirmPasswordInput = ref('')
const router = useRouter()


const register = `
mutation Register($email: String!, $username: String!, $password: String!, $id: ID!) {
    register(email: $email, username: $username, password: $password, id: $id)
}
`

const { execute } = useMutation(register)
function submitRegister(email, username, password, confirmPassword) {
    if(!email || !username || !password || !confirmPassword) {
        return Notify.create({
        message: "Você deve preencher todos os campos",
        color: 'negative',
        icon: 'warning',
        timeout: 3000
      })
    }
    if(password !== confirmPassword) {
        return Notify.create({
        message: "Suas senhas não são iguais!",
        color: 'negative',
        icon: 'warning',
        timeout: 3000
      })
    }
execute({
email: email,
username: username,
password: confirmPassword,
id: Math.floor(Math.random() * 10000000)
}).then(({ data }) => {
if(data.register === true) {
    return Notify.create({
        message: "Esse usuario ja existe",
        color: 'negative',
        icon: 'warning',
        timeout: 3000
    })
}
Notify.create({
        message: "Conta criada, faça seu login",
        color: 'positive',
        icon: 'check',
        timeout: 3000
})
return router.push({ name: 'Login' })
}).catch(() => {
    return;
})
}

</script>

<template>
        <q-card class="my-card">
                <q-card-section>
                    <span class="text-h2">Registro</span>
                </q-card-section>
                <q-separator color="black"/>
                <q-card-section>
                    <q-input v-model="emailInput" type="email" label="E-mail" stack-label /><br>
                    <q-input v-model="usernameInput" label="Nome do Usuario" stack-label /><br>
                    <q-input v-model="passwordInput" :type="pswVisibility ? 'password' : 'text'" label="Senha" stack-label /><br>
                    <q-icon :name="pswVisibility ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="pswVisibility = !pswVisibility"/>
                    <q-input v-model="confirmPasswordInput" type="password" label="Confirmar Senha" stack-label /><br><br>
                    <q-btn class="btnRegister" color="primary" label="Registrar" icon="edit" @click="submitRegister(emailInput, usernameInput, passwordInput, confirmPasswordInput)"/><br>
                    <span class="my-text text-subtitle1">Ja possui conta?<router-link :to="{ name: 'Login' }"> Clique Aqui</router-link></span>
                </q-card-section>
        </q-card>
</template>
<style scoped>
.cursor-pointer {
    left: 540px;
    bottom: 50px;
}

.my-card {
    background-color: rgb(190, 189, 189);
    width: 600px;
    height: 700px;
}

.btnRegister {
    position: absolute;
    left: 40%;
}

.my-text {
    position: absolute;
    left: 300px;
    top: 410px;
}
</style>