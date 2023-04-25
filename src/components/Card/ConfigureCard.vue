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

async function eUsername(username, id) {
    if (!username)
        return notify({
            message: 'Preencha o campo',
            icon: 'warning',
            color: 'warning',
        });
    try {
        const { editUsername } = await runMutation(EditUsername, { username, id })
        return notify({
            message: `User alterado para: ${username}, atualize a pagina!`,
            icon: 'check',
            color: 'positive',
        });
    } catch {
        return notify({
            message: `Um erro ocorreu ao fazer a mudança de username`,
            icon: 'error',
            color: 'negative',
        });
    }
}

async function eEmail(email, id) {
    if (!email)
        return notify({
            message: 'Preencha o campo',
            icon: 'warning',
            color: 'warning',
        });
    try {
        const { editEmail } = await runMutation(EditEmail, { email, id })
        return notify({
            message: `Email alterado para: ${email}, atualize a pagina!`,
            icon: 'check',
            color: 'positive',
        });
    } catch {
        return notify({
            message: `Um erro ocorreu ao fazer a mudança de email`,
            icon: 'error',
            color: 'negative',
        });
    }
}

async function ePassword(password, id) {
    if (!password)
        return notify({
            message: 'Preencha o campo',
            icon: 'warning',
            color: 'warning',
        });
    try {
        const { editPassword } = await runMutation(EditPassword, { password, id })
        return notify({
            message: `Senha alterada para: ${password}, atualize a pagina!`,
            icon: 'check',
            color: 'positive',
        });
    } catch {
        return notify({
            message: `Um erro ocorreu ao fazer a mudança de senha`,
            icon: 'error',
            color: 'negative',
        });
    }
}
</script>

<template>
    <span class="my-configs h1-text">Configs</span>
    <q-input v-model="usernameEdit" rounded outlined class="configUsername" label="Username" />
    <q-btn @click="eUsername(usernameEdit, store.getId)" class="btnUsername" round icon="edit" color="transparent" />
    <q-input v-model="emailEdit" rounded outlined class="configEmail" label="E-mail" />
    <q-btn @click="eEmail(emailEdit, store.getId)" class="btnEmail" round icon="edit" color="transparent" />
    <q-input v-model="passwordEdit" rounded outlined class="configPassword" label="Senha" />
    <q-btn @click="ePassword(passwordEdit, store.getId)" class="btnPassword" round icon="edit" color="transparent" />
</template>

<style scoped>
.my-configs {
    position: absolute;
    top: 470px;
    left: 0;
    font-size: 40px;
}

.configUsername {
    position: absolute;
    top: 550px;
    left: 20px;
}

.configEmail {
    position: absolute;
    top: 630px;
    left: 20px;
}

.configPassword {
    position: absolute;
    top: 710px;
    left: 20px;
}

.btnUsername {
    position: absolute;
    top: 560px;
    left: 230px;
}

.btnEmail {
    position: absolute;
    top: 640px;
    left: 230px;
}

.btnPassword {
    position: absolute;
    top: 720px;
    left: 230px;
}
</style>