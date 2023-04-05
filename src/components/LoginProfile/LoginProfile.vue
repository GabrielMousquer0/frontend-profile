<script setup>
import {
	useMutation,
	ref,
	useQuasar,
	computed,
	useRouter
}
from '../../utils/'
import { auth } from '../../schemas/'
import { useUserStore } from '../../store/UserStore.js'

const store = useUserStore()
const pswVisibility = ref(false)
const router = useRouter()
const passwordText = ref('')
const userText = ref('')
const { notify } = useQuasar()
const config = {
	true: {
		v1: 'visibility',
		v2: 'text'
	},
	false: {
		v1: 'visibility_off',
		v2: 'password'
	}
}

const {
	execute
} = useMutation(auth)

function submitInput(email, password) {
	execute({
		email: email,
		password: password
	}).then(({
		data
	}) => {
		if(!data) {
			return notify({
				message: "Usuario não encontrado",
				color: 'negative',
				icon: 'warning',
				timeout: 3000
			})
		};
	store.user_username = data.auth.username
	store.user_email = data.auth.email
	store.user_password = data.auth.password
	store.user_role = data.auth.role
	store.user_id = data.auth.id
	store.user_avatar = data.auth.avatar
	store.user_createdat = data.auth.created_at
		return router.push({
			name: 'ProfileUser',
			params: {
				id: data.auth.id
			}
		})
	});
};

function iconEvent() {
pswVisibility.value = !pswVisibility.value
}
const type = computed(() => config[pswVisibility.value])
</script>

<template>

        <q-input class="inputLogin" type="email" label="E-mail" stack-label v-model="userText"/>
        <q-input class="inputLogin" :type="type.v2" label="Senha" stack-label v-model="passwordText"/>           
        <q-icon :name="type.v1" class="pointer" @click="iconEvent()"/>
        <q-btn class="btnLogin" icon="login" color="primary" label="Login" @click="submitInput(userText, passwordText)"/>
          <span class="registerText text-subtitle1">Não possui conta? <router-link to="/register">Cadastre-se</router-link></span>

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