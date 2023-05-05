<script setup>
import { reactive } from 'vue';
import { useUserStore } from '../../store';
import { runMutation, positiveNotify } from '../../helpers';
import EditOptions from '../../schemas/mutation/editOptions.gql';

const store = useUserStore();

const status = reactive({
  role: store.getUser.options.role,
  description: store.getUser.options.description,
  created_at: store.getUser.options.created_at,
  languages: store.getUser.options.languages,
});

async function saveOptions(id, input) {
  const { editOptions } = await runMutation(EditOptions, { id, input });
  store.setUserOptions(editOptions);
  return positiveNotify('Foi editado suas opções');
}
</script>

<template>
  <q-card class="cardOPtions">
    <span class="text-h2">Opções</span>
    <q-card-section>
      <span class="text-subtitle1">Aqui você pode configurar o que você deseja mostrar<br>em seu perfil para outros usuarios</span>
    </q-card-section>
    <q-card-section class="column">
      <q-toggle 
        v-model="status.languages"
        label="Linguagens"
        checked-icon="terminal"
        unchecked-icon="clear"
      />
      <q-toggle 
        v-model="status.role"
        label="Cargo"
        checked-icon="manage_accounts"
        unchecked-icon="clear"
      />
      <q-toggle 
        v-model="status.created_at"
        label="Criado Em"
        checked-icon="calendar_month"
        unchecked-icon="clear"
      />
      <q-toggle 
        v-model="status.description"
        label="Descrição"
        checked-icon="description"
        unchecked-icon="clear"
      />
    </q-card-section>
    <q-btn
      label="Salvar"
      icon="save"
      color="primary"
      @click="saveOptions(store.getUser.id, status)"
    />
  </q-card>
</template>

<style scoped>
  
</style>