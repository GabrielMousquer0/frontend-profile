<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { routerStore } from '../../store';
import { runMutation, negativeNotify, positiveNotify } from '../../helpers/';
import Register from '../../schemas/mutation/register.gql';

const routerDefine = routerStore();
const router = useRouter();
const pswVisibility = ref(false);
const buttonDisabledValue = ref(false);
const inputValue = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
});

const verifyButtonRule = computed(() => {
  if (!inputValue.email.trim() || !inputValue.username.trim() || !inputValue.password.trim() || !inputValue.confirmPassword.trim() || inputValue.password.trim() !== inputValue.confirmPassword.trim()) {
    return !buttonDisabledValue.value;
  } 
  return buttonDisabledValue.value;
});
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



async function submitRegister(input) {
  try {
    const { register } = await runMutation(Register, { input });
    if (register) {
      return negativeNotify('Esse usuário ja existe');
    }
    positiveNotify('Conta criada, faça seu login');
    return router.push({
      name: 'Login',
    });
  } catch {
    return negativeNotify('Aconteceu um erro ao registrar');
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
        v-model="inputValue.email"
        type="email"
        label="E-mail"
        stack-label
      />
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="inputValue.username"
        label="Nome do Usuário"
        stack-label
      />
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="inputValue.password"
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
        v-model="inputValue.confirmPassword"
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
        :disable="verifyButtonRule"
        @click="submitRegister(inputValue)"
      >
        <q-tooltip
          v-model="verifyButtonRule"
          class="bg-red"
          :offset="[10, 10]"
        >
          Preencha os campos corretamente!
        </q-tooltip>
      </q-btn>
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