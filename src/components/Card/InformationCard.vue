<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useUserStore } from '../../store';
import { runMutation } from '../../helpers/';
import EditUser from '../../schemas/mutation/EditUser.gql';

const store = useUserStore();
const avatarURL = ref('');
const { notify } = useQuasar();

async function urlSend(avatar, id) {
  if (!avatar)
    return notify({
      message: 'Você deve me dar uma url',
      icon: 'warning',
      color: 'negative',
    });
  try {
    await runMutation(EditUser, { input: {
      avatar
    }, id });
    store.user.infos.avatar = avatar;
    return notify({
      message: 'Foto de perfil alterada com sucesso',
      icon: 'check',
      color: 'positive',
    });
  } catch {
    return notify({
      message: 'Me dê uma url valida!',
      icon: 'warning',
      color: 'orange',
    });
  }
}
</script>

<template>
  <div class="avatar row justify-center">
    <q-avatar
      rounded
      class="myIcon"
      size="200px"
    >
      <img :src="store.getUser.infos.avatar">
    </q-avatar>
    <div class="column justify-end">
      <q-btn
        class="button"
        round
        icon="edit"
        color="primary"
      >
        <q-popup-edit
          v-model="avatarURL"
          v-slot="scope"
        >
          <q-input
            v-model="avatarURL"
            hint="Digite uma URL de alguma imagem"
            rounded
            dense
            @keyup.enter="scope.set"
          >
            <q-btn
              class="iconSend"
              flat
              @click="urlSend(avatarURL, store.getUser.id)"
              icon="add"
            />
          </q-input>
        </q-popup-edit>
      </q-btn>
    </div>
  </div>
</template>

<style scoped>
.avatar {
    margin-top: 4rem;
    margin-bottom: 8.7rem;
}

.button {
    height: 1rem;
    width: 10px;
}
</style>