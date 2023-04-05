<script setup>
import {
    ref,
    moment,
    ms,
    useMutation,
    useQuasar
} from '../../../utils';
import {
    useUserStore
} from '../../../store/UserStore';
import {
    description,
    languages
} from '../../../schemas';

const store = useUserStore()
const {
    notify
} = useQuasar()
const js = ref(store.getLanguages.javascript ? true : false)
const ts = ref(store.getLanguages.typescript ? true : false)
const py = ref(store.getLanguages.python ? true : false)
const expanded = ref(['Informações'])
const date = moment(ms(store.getCreatedAt, {
    long: true
})).format('llll')
const myLangJs = store.getLanguages.javascript === '' ? '/none.png' : store.getLanguages.javascript.replace("javascript", "/js.png")
const myLangTs = store.getLanguages.typescript === '' ? '/none.png' : store.getLanguages.typescript.replace("typescript", "/typescript.png")
const myLangPy = store.getLanguages.python === '' ? '/none.png' : store.getLanguages.python.replace("python", "/python.png")
const arrayLangs = [myLangJs, myLangTs, myLangPy]
const descriptionRef = ref(store.getDescription)
const simple = [{
    label: 'Informações',
    avatar: store.getAvatar,
    children: [{
            label: 'Nome do Usuario',
            icon: 'person',
            children: [{
                label: store.getUsername,
                icon: 'chevron_right'
            }]
        },
        {
            label: 'E-mail',
            icon: 'mail',
            children: [{
                label: store.getEmail,
                icon: 'chevron_right'
            }]
        },
        {
            label: 'Conta criada em',
            icon: 'calendar_month',
            children: [{
                label: date,
                icon: 'chevron_right'
            }]
        },
        {
            label: 'Cargo do Usuario',
            icon: 'leaderboard',
            children: [{
                label: store.getRole,
                icon: 'chevron_right'
            }]
        },
        {
            label: 'ID do Usuario',
            icon: 'numbers',
            children: [{
                label: store.getId,
                icon: 'chevron_right'
            }]
        },
    ]
}]

const descriptionUserUpdate = useMutation(description)

function descriptionEdit(description, id) {
    if (!description) return notify({
        message: 'Deve digitar algo',
        icon: 'warning',
        color: 'orange'
    })

    descriptionUserUpdate.execute({
        description,
        id
    }).then(({
        data
    }) => {
        store.user_description = description
        return notify({
            message: 'Sua descrição foi atualizada',
            icon: 'check',
            color: 'positive'
        })
    })
}

const languageUserUpdate = useMutation(languages)

function languagesEdit(id) {
    const langJs = js.value ? 'javascript' : ''
    const langTs = ts.value ? 'typescript' : ''
    const langPy = py.value ? 'python' : ''

    languageUserUpdate.execute({
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
    <div class="tableColumn">
        <q-tree :nodes="simple" no-connectors node-key="label" v-model:expanded="expanded" class="tree-column" default-expand-all/>
    </div>
    <div class="description">
        <span class="title-description text-h1">Descrição</span>
        <q-separator color="black" />
        <q-input class="inputDescription" v-model="descriptionRef" type="textarea" outlined/>
        <q-btn class="btnDescription" @click="descriptionEdit(descriptionRef, store.getId)" icon="edit" label="Editar" color="primary" />
    </div>
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
.tableColumn {
    position: absolute;
    top: 350px;
    right: 400px;
    margin: 0;
    padding: 0;
}

.description {
    position: absolute;
    top: 150px;
    left: 400px;
    margin: 0;
    padding: 0;
}

.tecs {
    position: absolute;
    top: 500px;
    left: 400px;
    margin: 0;
    padding: 0;
}

.title-description {
    font-size: 80px;
}

.title-tecs {
    font-size: 80px;
}

.inputDescription {
    position: absolute;
    top: 150px;
    width: 700px;
}

.btnDescription {
    position: absolute;
    top: 285px;
}
</style>