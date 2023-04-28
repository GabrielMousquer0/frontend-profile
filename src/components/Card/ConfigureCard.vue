<script setup>
import { useUserStore } from '../../store';
import EditUser from '../../schemas/mutation/EditUser.gql';
import EditPassword from '../../schemas/mutation/EditPassword.gql';
import { ref, useQuasar, runMutation } from '../../utils/';

const store = useUserStore();
const usernameEdit = ref('');
const emailEdit = ref('');
const passwordEdit = ref('');
const { notify } = useQuasar();

async function editName(username, id) {
  if (!username)
    return notify({
      message: 'Preencha o campo',
      icon: 'warning',
      color: 'warning',
    });
  try {
    await runMutation(EditUser, { input: {
      username
    }, id });
    store.user.username = username;
    return notify({
      message: `User alterado para: ${username}, atualize a pagina!`,
      icon: 'check',
      color: 'positive',
    });
  } catch {
    return notify({
      message: 'Um erro ocorreu ao fazer a mudança de username',
      icon: 'error',
      color: 'negative',
    });
  }
}

async function editEmail(email, id) {
  if (!email)
    return notify({
      message: 'Preencha o campo',
      icon: 'warning',
      color: 'warning',
    });
  try {
    await runMutation(EditUser, { input: {
      email
    }, id });
    store.user.email = email;
    return notify({
      message: `Email alterado para: ${email}, atualize a pagina!`,
      icon: 'check',
      color: 'positive',
    });
  } catch {
    return notify({
      message: 'Um erro ocorreu ao fazer a mudança de email',
      icon: 'error',
      color: 'negative',
    });
  }
}

async function editPassword(password, id) {
  if (!password)
    return notify({
      message: 'Preencha o campo',
      icon: 'warning',
      color: 'warning',
    });
  try {
    await runMutation(EditPassword, {password, id });
    return notify({
      message: `Senha alterada para: ${password}, atualize a pagina!`,
      icon: 'check',
      color: 'positive',
    });
  } catch {
    return notify({
      message: 'Um erro ocorreu ao fazer a mudança de senha',
      icon: 'error',
      color: 'negative',
    });
  }
}
</script>

<template>
  <div>
    <span class="text h1-text">Configs</span>
    <div class="row q-pa-md">
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