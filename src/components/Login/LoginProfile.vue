<script setup>
import {
  ref,
  useQuasar,
  computed,
  useRouter,
  runMutation,
} from '../../helpers/';
import Auth from '../../schemas/mutation/auth.gql';
import { useUserStore, routerStore } from '../../store';

const routerDefine = routerStore();
const store = useUserStore();
const router = useRouter();
const { notify } = useQuasar();

const pswVisibility = ref(false);
const passwordText = ref('');
const userText = ref('');

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

async function submitLogin(email, password) {
  try {
    const { auth } = await runMutation(Auth, { email, password });
    const newValue = auth.languages.map(
      (value) =>
        (value = {
          name: value.name,
          id: value.id,
          icon: value.id,
        }),
    );
    store.$patch({
      user: {
        email: auth.email,
        id: auth.id,
        username: auth.username,
        infos: {
          avatar: auth.infos.avatar ? auth.infos.avatar : '/default_avatar.webp',
          created_at: auth.infos.created_at,
          description: auth.infos.description,
          role: auth.infos.role,
        },
        languages: newValue
      },
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
  <div class="column">
    <q-input
      class="inputLogin"
      type="email"
      label="E-mail"
      stack-label
      v-model="userText"
    />
    <q-input
      class="inputLogin"
      :type="type.v2"
      label="Senha"
      stack-label
      v-model="passwordText"
    >
      <template #append>
        <q-icon
          :name="type.v1"
          class="pointer"
          @click="iconEvent()"
        />
      </template>
    </q-input>
    <q-btn
      class="btnLogin"
      icon="login"
      color="primary"
      label="Login"
      @click="submitLogin(userText, passwordText)"
    />
    <span class="registerText text-subtitle1">Não possui conta? <router-link to="/register">Cadastre-se</router-link></span>
  </div>
</template>

<style scoped>
.inputLogin {
    height: 80px;
    width: 320px;
}
</style>