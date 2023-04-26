<script setup>
import { useUserStore } from '../../store';
import EditEmail from '../../schemas/mutation/editEmail.gql';
import EditUsername from '../../schemas/mutation/editUsername.gql';
import EditPassword from '../../schemas/mutation/editPassword.gql';
import { ref, useQuasar } from '../../utils/';
import { runMutation } from '../../helpers/graphql';

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
    await runMutation(EditUsername, { username, id });
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
    await runMutation(EditEmail, { email, id });
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
    await runMutation(EditPassword, { password, id });
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
        @click="editName(usernameEdit, store.getId)"
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
        @click="editEmail(emailEdit, store.getId)"
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
        @click="editPassword(passwordEdit, store.getId)"
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