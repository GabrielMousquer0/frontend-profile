<script setup>
import { useQuasar, runMutation, runQuery } from '../../helpers';
import { useUserStore } from '../../store';
import LanguageInsert from '../../schemas/mutation/languagesInsert.gql';
import LanguageDelete from '../../schemas/mutation/languagesDelete.gql';
import LanguagesList from '../../schemas/query/languagesList.gql';
import User from '../../schemas/query/user.gql';

const store = useUserStore();
const { notify } = useQuasar();

const result = runQuery(LanguagesList, { id: store.getUser.id }, 'cache-and-network');
const user = runQuery(User, { id: store.getUser.id }, 'cache-and-network');

async function insertLanguageUser(id, languageId) {
  await runMutation(LanguageInsert, { id, language: languageId }, ['user', 'languagesList']);
  await user.refetch();
  await result.refetch();
  return notify({ message: 'Linguagem Atualizada', color: 'positive', icon: 'check' });
}

async function deleteLanguageUser(id, languageId) {
  await runMutation(LanguageDelete, { id, language: languageId }, ['user', 'languagesList']);
  await user.refetch();
  await result.refetch();
  return notify({ message: 'Linguagem Excluida', color: 'positive', icon: 'check' });
}
</script>

<template>
  <div
    class="tecs"
    v-if="result"
  >
    <span class="title-tecs text-h1">Linguagens</span>
    <q-separator color="black" />
    <q-card
      class="tecCard"
    >
      <q-btn-dropdown
        dropdown-icon="add"
      >
        <q-list
          v-for="lang in result.data.value?.languagesList"
          :key="lang"
        >
          <q-item-section>
            <q-btn @click="insertLanguageUser(store.getUser.id, lang.id)">
              <q-icon>
                <img :src="lang.icon">
              </q-icon>{{ lang.name }}
            </q-btn> 
          </q-item-section>
        </q-list>
      </q-btn-dropdown>
      <div v-if="user">
        <q-list
          v-for="listLanguagesUser in user.data.value?.user.languages"
          :key="listLanguagesUser"
        >
          <q-btn>
            <q-icon>
              <img :src="listLanguagesUser.icon">
            </q-icon>
            {{ listLanguagesUser.name }}
          </q-btn> 
          <q-icon
            name="delete"
            @click="deleteLanguageUser(store.getUser.id, listLanguagesUser.id)"
          />
        </q-list>
      </div>
    </q-card>
  </div>
</template>