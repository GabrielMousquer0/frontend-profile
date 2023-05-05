<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../store';
import { runMutation, positiveNotify, negativeNotify } from '../../helpers/';
import EditUser from '../../schemas/mutation/EditUser.gql';
import EditPassword from '../../schemas/mutation/EditPassword.gql';

const store = useUserStore();
const usernameEdit = ref('');
const emailEdit = ref('');
const passwordEdit = ref('');

async function editName(username, id) {
  if (!username) {
    return negativeNotify('Preencha o campo');
  }

  try {
    await runMutation(EditUser, { input: {
      username
    }, id });
    store.user.username = username;
    return positiveNotify(`Nome do usuario alterado para: ${username}`);
  } catch {
    return negativeNotify('Um erro ocorreu ao fazer a mudança do nome do usuario!');
  }
}

async function editEmail(email, id) {
  if (!email) {
    return negativeNotify('Preencha o campo');
  }

  try {
    await runMutation(EditUser, { input: {
      email
    }, id });
    store.user.email = email;
    return positiveNotify(`Email alterado para: ${email}`);
  } catch {
    return negativeNotify('Um erro ocorreu ao fazer a mudança de email');
  }
}

async function editPassword(password, id) {
  if (!password)
    return negativeNotify('Preencha o campo');
  try {
    await runMutation(EditPassword, {password, id });
    return positiveNotify(`Senha alterada para: ${password}`);
  } catch {
    return negativeNotify('Um erro ocorreu ao fazer a mudança de senha');
  }
}
</script>

<template>
  <div>
    <span class="text h1-text">Configs</span>
    <div class="row">
      <q-input
        v-model="usernameEdit"
        rounded
        outlined
        class="input"
        id="inputEdit"
        label="Username"
      />
      <q-btn
        @click="editName(usernameEdit, store.getUser.id)"
        class="button buttonEdit"
        round
        icon="edit"
        color="transparent"
      />
    </div>
    <div class="row q-pa-md">
      <q-input
        v-model="emailEdit"
        rounded
        outlined
        class="input"
        id="inputEdit"
        label="E-mail"
      />
      <q-btn
        @click="editEmail(emailEdit, store.getUser.id)"
        round
        icon="edit"
        class="button buttonEdit"
        color="transparent"
      />
    </div>
    <div class="row q-pa-md">
      <q-input
        v-model="passwordEdit"
        rounded
        outlined
        class="input"
        id="inputEdit"
        label="Senha"
      />
      <q-btn
        @click="editPassword(passwordEdit, store.getUser.id)"
        class="button buttonEdit"
        round
        icon="edit"
        color="transparent"
      />
    </div>
  </div>
</template>

<style scoped>
.input {
    margin-bottom: 2rem;
}

.button {
    height: 10px;
    margin-left: 10px;
}

.text {
    font-size: 40px;
}
</style>