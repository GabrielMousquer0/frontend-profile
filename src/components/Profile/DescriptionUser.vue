<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../store';
import { runMutation, positiveNotify, negativeNotify } from '../../helpers';
import Description from '../../schemas/mutation/description.gql';

const store = useUserStore();
const descriptionRef = ref(store.getUser.infos.description);

async function descriptionEdit(description, id) {
  if (!description)
    return negativeNotify('Deve digitar algo');
  try {
    await runMutation(Description, { description, id });
    store.user.infos.description = description;
    return positiveNotify('Sua descrição foi atualizada');
  } catch (e) {
    return negativeNotify('Não foi possivel alterar sua descrição');
  }
}
</script>

<template>
  <div class="description ">
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