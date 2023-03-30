<script setup>
import { useMutation, ref, Notify, useRouter } from '../../utils/'

const pswVisibility = ref(true)
const router = useRouter()
const passwordText = ref('')
const userText = ref('')

const auth = `
mutation Auth($email: String!, $password: String!) {
  auth(email: $email, password: $password) {
    password
    id
    email
  }
}
`

const { execute } = useMutation(auth)
function submitInput(email, password) {
  execute({
    email: email,
    password: password
  }).then(({ data }) => {
    if (!data) {
      return Notify.create({
        message: "Usuario não encontrado",
        color: 'negative',
        icon: 'warning',
        timeout: 3000
      })
    };
    return router.push({
      name: 'ProfileUser',
      params: { id: data.auth.id }
    })
  }).catch((e) => {
    return;
  });
};
</script>

<template>
    <span class="row justify-center fixed-center">
        <q-input class="inputLogin" type="email" label="E-mail" stack-label v-model="userText"/>
        <q-input class="inputLogin" :type="pswVisibility ? 'password' : 'text'" label="Senha" stack-label v-model="passwordText"/>           
        <q-icon :name="pswVisibility ? 'visibility_off' : 'visibility'" class="pointer" @click="pswVisibility = !pswVisibility"/>
        <q-btn class="btnLogin" icon="login" color="primary" label="Login" @click="submitInput(userText, passwordText)"/>
          <span class="registerText text-subtitle1">Não possui conta? <router-link to="/register">Cadastre-se</router-link></span>
    </span>
</template>

<style scoped>
.inputLogin {
    height: 80px;
    width: 320px;
}

.pointer {
  position: absolute;
    left: 300px;
    bottom: 70px;
}



.registerText {
  position: absolute;
  top: 200px;
  left: 86px;
}
</style>
 