<script setup>
import {
    ref,
    useMutation,
    useQuasar
} from '../../../../utils';
import {
    useUserStore
} from '../../../../store/UserStore.js';
import {
    description,
} from '../../../../schemas';

const store = useUserStore()
const descriptionRef = ref(store.getDescription)
const { notify } = useQuasar()

const { execute } = useMutation(description)

function descriptionEdit(description, id) {
    if (!description) return notify({
        message: 'Deve digitar algo',
        icon: 'warning',
        color: 'orange'
    })

    execute({
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

</script>

<template>
    <div class="description">
        <span class="title-description text-h1">Descrição</span>
        <q-separator color="black" />
        <q-input class="inputDescription" v-model="descriptionRef" type="textarea" outlined/>
        <q-btn class="btnDescription" @click="descriptionEdit(descriptionRef, store.getId)" icon="edit" label="Editar" color="primary" />
    </div>
</template>

<style scoped>

.description {
    position: absolute;
    top: 150px;
    left: 400px;
    margin: 0;
    padding: 0;
}


.title-description {
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