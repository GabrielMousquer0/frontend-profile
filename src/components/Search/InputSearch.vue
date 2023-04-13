<script setup>
import { ref, useQuasar, useRouter } from '../../utils'
import { viewUserStore } from '../../store';

const searchInput = ref('')
const { notify } = useQuasar()
const router = useRouter()
const store = viewUserStore()

function searchBtn(username) {
if(!username) return notify({message: 'Me dê um username', color: 'orange', icon: 'warning'}) 

store.search_user_username = username
 return router.push({
    name: 'searchUser',
    params: { username }
})
}

</script>

<template>
<q-input v-model="searchInput" filled type="search" label="Procure por um username" class="search-input">
            <template v-slot:append>
              <q-icon name="search" @click="searchBtn(searchInput)"/>
            </template>
        </q-input>

</template>

<style scoped>
.search-input {
  width: 16rem;
  
}
</style>