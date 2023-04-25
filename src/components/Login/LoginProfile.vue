<script setup>
import {
    ref,
    useQuasar,
    computed,
    useRouter,
} from '../../utils/';
import { runMutation } from '../../helpers/graphql';
import Auth from '../../schemas/mutation/auth.gql';
import { useUserStore, routerStore } from '../../store';

const routerDefine = routerStore();
const store = useUserStore();
const pswVisibility = ref(false);
const router = useRouter();
const passwordText = ref('');
const userText = ref('');
const { notify } = useQuasar();
routerDefine.router_name = 'Login';
const config = {
    true: {
        v1: 'visibility',
        v2: 'text',
    },
    false: {
        v1: 'visibility_off',
        v2: 'password',
    },
};

async function submitInput(email, password) {
    try {
        const { auth } = await runMutation(Auth, { email, password })
        const newValue = auth.languages.map(
            (value) =>
            (value = {
                name: value.name,
                id: value.id,
                icon: value.id,
            }),
        );
        store.$patch({
            user_languages: newValue,
            user_username: auth.username,
            user_email: auth.email,
            user_role: auth.infos.role,
            user_id: auth.id,
            user_avatar: auth.infos.avatar ? auth.infos.avatar : '/default_avatar.webp',
            user_createdat: auth.infos.created_at,
            user_description: auth.infos.description,
        });
        return router.push({
            name: 'ProfileUser',
            params: {
                id: auth.id,
            },
        });
    } catch {
        return notify({
            message: 'Usuario não encontrado',
            color: 'negative',
            icon: 'warning',
            timeout: 3000,
        });
    }
}

function iconEvent() {
    pswVisibility.value = !pswVisibility.value;
}
const type = computed(() => config[pswVisibility.value]);
</script>

<template>
    <q-input class="inputLogin" type="email" label="E-mail" stack-label v-model="userText" />
    
    <q-input class="inputLogin" :type="type.v2" label="Senha" stack-label v-model="passwordText" />
    <q-icon :name="type.v1" class="pointer" @click="iconEvent()" />
    <q-btn class="btnLogin" icon="login" color="primary" label="Login" @click="submitInput(userText, passwordText)" />
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