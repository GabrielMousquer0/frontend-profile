<script setup>
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useUserStore, routerStore } from '../../store';
import { runMutation } from '../../helpers/';
import Auth from '../../schemas/mutation/auth.gql';

const routerDefine = routerStore();
const store = useUserStore();
const router = useRouter();
const { notify } = useQuasar();

const pswVisibility = ref(false);
const passwordText = ref('');
const userText = ref('');

routerDefine.router_name = 'Login';
const value = {
  true: {
    icon: 'visibility',
    type: 'text',
  },
  false: {
    icon: 'visibility_off',
    type: 'password',
  },
};

async function submitLogin(email, password) {
  try {
    const { auth } = await runMutation(Auth, { email, password });
    store.user = auth;
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

function iconValue() {
  pswVisibility.value = !pswVisibility.value;
}
const config = computed(() => value[pswVisibility.value]);
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
      :type="config.type"
      label="Senha"
      stack-label
      v-model="passwordText"
    >
      <template #append>
        <q-icon
          :name="config.icon"
          class="pointer"
          @click="iconValue()"
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