<script setup>
import { ref, useQuasar, runMutation } from '../../utils';
import { useUserStore } from '../../store';
import LanguageUpdate from '../../schemas/mutation/languages.gql';

const store = useUserStore();
const { notify } = useQuasar();
const languages = store.getUser.languages;
let js = ref(languages[languages.findIndex((a) => a.id == 1)] ? true : false);
let py = ref(languages[languages.findIndex((a) => a.id == 2)] ? true : false);
let ts = ref(languages[languages.findIndex((a) => a.id == 3)] ? true : false);
const imgs = languages.map((a) => a.icon.replace('1', '/js.png').replace('3', '/typescript.png').replace('2', '/python.png'));

async function languagesEdit(id) {
  const langs = [js.value ? 1 : 0, py.value ? 2 : 0, ts.value ? 3 : 0];
  try {
    const { insertLanguages } = await runMutation(LanguageUpdate, { languages: langs, id });
    const newLangs = insertLanguages.languages.map(
      (value) =>
        (value = {
          name: value.name,
          id: value.id,
          icon: value.id,
        }),
    );
    store.user.languages = newLangs;
    return notify({
      message: 'Suas linguagens foi atualizada, Atualize a pagina',
      icon: 'check',
      color: 'positive',
    });
  } catch {
    return notify({
      message: 'Um erro ocorreu e não foi possivel alterar suas linguagens',
      icon: 'error',
      color: 'negative',
    });
  }

}
</script>

<template>
  <div class="tecs">
    <span class="title-tecs text-h1">Tecnologias</span>
    <q-separator color="black" />
    <q-card class="tecCard">
      <q-card-section>
        <q-checkbox
          color="black"
          label="JavaScript"
          v-model="js"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
      </q-card-section>
      <q-card-section>
        <q-checkbox
          color="black"
          label="TypeScript"
          v-model="ts"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
      </q-card-section>
      <q-card-section>
        <q-checkbox
          color="black"
          label="Python"
          v-model="py"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
      </q-card-section>
      <q-card-section>
        <q-avatar
          v-for="n in imgs"
          :key="n"
          size="40px"
        >
          <img :src="n">
        </q-avatar>
      </q-card-section>
      <q-btn
        @click="languagesEdit(store.getUser.id)"
        color="primary"
        label="salvar"
        icon="save"
      />
    </q-card>
  </div>
</template>