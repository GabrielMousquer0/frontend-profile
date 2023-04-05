<script setup>
import {
    ref,
    useMutation,
    useQuasar
} from '../../../../utils';
import {
    useUserStore
} from '../../../../store/UserStore';
import {
    languages
} from '../../../../schemas';

const store = useUserStore()
const { notify } = useQuasar()
const js = ref(store.getLanguages.javascript ? true : false)
const ts = ref(store.getLanguages.typescript ? true : false)
const py = ref(store.getLanguages.python ? true : false)
const myLangJs = store.getLanguages.javascript === '' ? '/none.png' : store.getLanguages.javascript.replace("javascript", "/js.png")
const myLangTs = store.getLanguages.typescript === '' ? '/none.png' : store.getLanguages.typescript.replace("typescript", "/typescript.png")
const myLangPy = store.getLanguages.python === '' ? '/none.png' : store.getLanguages.python.replace("python", "/python.png")
const arrayLangs = [myLangJs, myLangTs, myLangPy]

const { execute } = useMutation(languages)

function languagesEdit(id) {
    const langJs = js.value ? 'javascript' : ''
    const langTs = ts.value ? 'typescript' : ''
    const langPy = py.value ? 'python' : ''

    execute({
        id,
        LanguageInput: {
            javascript: langJs,
            typescript: langTs,
            python: langPy,
        }
    }).then(({
        data
    }) => {
        store.user_languages = data.languages
        return notify({
            message: 'Suas Linguagens foram atualizadas, Atualize a pagina para vê-las',
            icon: 'check',
            color: 'positive'
        })
    })
}
</script>

<template>

<div class="tecs">
        <span class="title-tecs text-h1">Tecnologias</span>
        <q-separator color="black" />
        <q-card class="tecCard">
            <q-card-section>
                <q-checkbox color="yellow" label="JavaScript" v-model="js" checked-icon="task_alt" unchecked-icon="highlight_off" />
            </q-card-section>
            <q-card-section>
                <q-checkbox color="blue" label="TypeScript" v-model="ts" checked-icon="task_alt" unchecked-icon="highlight_off" />
            </q-card-section>
            <q-card-section>
                <q-checkbox color="red" label="Python" v-model="py" checked-icon="task_alt" unchecked-icon="highlight_off" />
            </q-card-section>
            <q-card-section>
                <q-avatar v-for="n in arrayLangs" :key="n" size="40px"> <img :src="n"> </q-avatar>
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