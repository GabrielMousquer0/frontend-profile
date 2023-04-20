<script setup>
import { useUserStore } from '../../store';
import { ms, moment, ref } from '../../utils';

const store = useUserStore()
const date = moment(ms(store.getCreatedAt, {
    long: true
})).format('llll')
const expanded = ref(['Informações'])
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
</script>

<template>
    <div class="tableColumn">
        <q-tree :nodes="simple" no-connectors node-key="label" v-model:expanded="expanded" class="tree-column" default-expand-all/>
    </div>
</template>

<style scoped>
.tableColumn {
    position: absolute;
    top: 350px;
    right: 400px;
    margin: 0;
    padding: 0;
}
</style>