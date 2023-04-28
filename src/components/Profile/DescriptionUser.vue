<script setup>
import { ref, useQuasar, runMutation } from '../../utils';
import { useUserStore } from '../../store';
import Description from '../../schemas/mutation/description.gql';

const store = useUserStore();
const descriptionRef = ref(store.getUser.infos.description);
const { notify } = useQuasar();

async function descriptionEdit(description, id) {
  if (!description)
    return notify({
      message: 'Deve digitar algo',
      icon: 'warning',
      color: 'orange',
    });
  try {
    await runMutation(Description, { description, id });
    store.user.infos.description = description;
    return notify({
      message: 'Sua descrição foi atualizada',
      icon: 'check',
      color: 'positive',
    });
  } catch (e) {
    return notify({
      message: 'Não foi possivel alterar sua descrição',
      icon: 'error',
      color: 'negative',
    });
  }
}
</script>

<template>
  <div class="description column ">
    <span class="title-description text-h1">Descrição</span>
    <q-separator color="black" />
    <q-input
      class="inputDescription"
      v-model="descriptionRef"
      type="textarea"
      outlined
    />
    <q-btn
      class="btnDescription"
      @click="descriptionEdit(descriptionRef, store.getUser.id)"
      icon="edit"
      label="Editar"
      color="primary"
    />
  </div>
</template>