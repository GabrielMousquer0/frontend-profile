<script setup>
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { routerStore } from '../../store';
import { runMutation } from '../../helpers/';
import Register from '../../schemas/mutation/register.gql';

const routerDefine = routerStore();
const pswVisibility = ref(false);
const emailInput = ref('');
const usernameInput = ref('');
const passwordInput = ref('');
const confirmPasswordInput = ref('');
const router = useRouter();
const { notify } = useQuasar();
routerDefine.router_name = 'Register';
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

async function submitRegister(email, username, password, confirmPassword) {
  if (!email || !username || !password || !confirmPassword) {
    return notify({
      message: 'Você deve preencher todos os campos',
      color: 'negative',
      icon: 'warning',
      timeout: 3000,
    });
  }
  if (password !== confirmPassword) {
    return notify({
      message: 'Suas senhas não são iguais!',
      color: 'negative',
      icon: 'warning',
      timeout: 3000,
    });
  }
  try {
    const { register } = await runMutation(Register, { email, username, password: confirmPassword });
    if (register) {
      return notify({
        message: 'Esse usuario ja existe',
        color: 'negative',
        icon: 'warning',
      });
    }
    notify({
      message: 'Conta criada, faça seu login',
      color: 'positive',
      icon: 'check',
    });
    return router.push({
      name: 'Login',
    });
  } catch {
    return notify({
      message: 'Aconteceu um erro ao registrar',
      color: 'negative',
      icon: 'warning',
    });
  }
}

function iconValue() {
  pswVisibility.value = !pswVisibility.value;
}

const config = computed(() => value[pswVisibility.value]);
</script>

<template>
  <q-card class="my-card">
    <q-card-section>
      <span class="text-h2">Registro</span>
    </q-card-section>
    <q-separator color="black" />
    <q-card-section>
      <q-input
        v-model="emailInput"
        type="email"
        label="E-mail"
        stack-label
      />
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="usernameInput"
        label="Nome do Usuário"
        stack-label
      />
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="passwordInput"
        :type="config.type"
        label="Senha"
        stack-label
      />
      <q-icon
        :name="config.icon"
        class="cursor-pointer"
        @click="iconValue()"
      />
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="confirmPasswordInput"
        type="password"
        label="Confirmar Senha"
        stack-label
      />
    </q-card-section>
    <q-card-section class="column">
      <q-btn
        class="btnRegister"
        color="primary"
        label="Registrar"
        icon="edit"
        @click="submitRegister(emailInput.trim(), usernameInput.trim(), passwordInput.trim(), confirmPasswordInput.trim())"
      />
      <span class="my-text text-subtitle1 row justify-end">Ja possui conta?<router-link :to="{ name: 'Login' }"> Clique Aqui</router-link></span>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.cursor-pointer {
    left: 540px;
    bottom: 30px;
}

.my-card {
    margin-top: 5rem;
    background-color: rgb(190, 189, 189);
    width: 600px;
    height: 700px;
}
</style>