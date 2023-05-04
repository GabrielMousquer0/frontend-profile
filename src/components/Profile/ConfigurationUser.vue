<script setup>
import { reactive, runMutation, useQuasar } from '../../helpers';
import { useUserStore } from '../../store';
import EditOptions from '../../schemas/mutation/editOptions.gql';

const store = useUserStore();
const { notify } = useQuasar();

const status = reactive({
  role: store.getUser.options.role,
  description: store.getUser.options.description,
  created_at: store.getUser.options.created_at,
  languages: store.getUser.options.languages,
});

async function saveOptions(id, input) {
  const { editOptions } = await runMutation(EditOptions, { id, input });
  store.user.options = editOptions;
  return notify({ message: 'Foi editado suas opções', color: 'positive', icon: 'check' });
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
        color="green"
        label="Linguagens"
        checked-icon="check"
        unchecked-icon="clear"
      />
      <q-toggle 
        v-model="status.role"
        color="green"
        label="Cargo"
        checked-icon="check"
        unchecked-icon="clear"
      />
      <q-toggle 
        v-model="status.created_at"
        color="green"
        label="Criado Em"
        checked-icon="check"
        unchecked-icon="clear"
      />
      <q-toggle 
        v-model="status.description"
        color="green"
        label="Descrição"
        checked-icon="check"
        unchecked-icon="clear"
      />
    </q-card-section>
    <q-btn
      label="Salvar"
      icon="save"
      color="primary"
      @click="saveOptions(store.getUser.id ,status)"
    />
  </q-card>
</template>

<style scoped>
  
</style>