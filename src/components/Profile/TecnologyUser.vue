<script setup>
import { useMutation, useQuery, ref, useQuasar } from '../../utils';
import { useUserStore } from '../../store';
import LanguageUpdate from '../../schemas/mutation/languages.gql'
import LanguageUser from '../../schemas/query/userLanguages.gql'

const store = useUserStore()
const { notify } = useQuasar()
const languages = store.getLanguages
let js = ref(languages[languages.findIndex((a) => a.id == 1)] ? true : false)
let py = ref(languages[languages.findIndex((a) => a.id == 2)] ? true : false)
let ts = ref(languages[languages.findIndex((a) => a.id == 3)] ? true : false)
const imgs = languages.map((a) => a.icon.replace('1', '/js.png').replace('2', '/python.png').replace('3', '/typescript.png'))

const { execute } = useMutation(LanguageUpdate, {
    refetchTags: ['all_languages']
})

function languagesEdit(id) {
    const langs = [js.value ? 1 : 0, py.value ? 2 : 0, ts.value ? 3 : 0]
    execute({
        id,
        languages: langs
    }).then(async ({ data }) => {
        const queryLanguage = await useQuery({
            query: LanguageUser,
            variables: { id },
        })
        const proxy = queryLanguage.data.value.languagesUser.languages
        console.log(proxy)
        const newValue = proxy.map((value) => value = {
            name: value.name,
            id: value.id,
            icon: value.id,
            status: true
        })
        store.user_languages = newValue;
        return notify({ message: 'Linguagens Atualizadas com sucesso, atualize a pagina para mostrar suas linguagens', color: 'positive', icon: 'check' })
    })
}
</script>

<template>
    <div class="tecs">
    
        <span class="title-tecs text-h1">Tecnologias</span>
        <q-separator color="black" />
        <q-card class="tecCard">
            <q-card-section>
                <q-checkbox color="black" label="JavaScript" v-model="js" checked-icon="task_alt" unchecked-icon="highlight_off" />
            </q-card-section>
            <q-card-section>
                <q-checkbox color="black" label="TypeScript" v-model="ts" checked-icon="task_alt" unchecked-icon="highlight_off" />
            </q-card-section>
            <q-card-section>
                <q-checkbox color="black" label="Python" v-model="py" checked-icon="task_alt" unchecked-icon="highlight_off" />
            </q-card-section>
            <q-card-section>
                <q-avatar v-for="n in imgs" :key="n" size="40px"> <img :src="n"> </q-avatar>
            </q-card-section>
            <q-btn @click="languagesEdit(store.getId)" color="primary" label="salvar" icon="save" />
        </q-card>
    </div>
</template>

<style scoped>
.text-info {
    position: absolute;
    top: 130px;
    font-size: 50px;
    right: 400px;
}

.tecCard {
    position: absolute;
    top: 150px;
    width: 400px;
}

.tecs {
    position: absolute;
    top: 500px;
    left: 400px;
    margin: 0;
    padding: 0;
}

.title-tecs {
    font-size: 80px;
}
</style>