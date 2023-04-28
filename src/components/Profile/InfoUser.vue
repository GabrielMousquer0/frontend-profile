<script setup>
import { useUserStore } from '../../store';
import { ms, moment, ref } from '../../helpers';

const store = useUserStore();
const date = moment(
  ms(store.getUser.infos.created_at, {
    long: true,
  }),
).format('llll');
const expanded = ref(['Informações']);
const simple = [{
  label: 'Informações',
  avatar: store.getUser.infos.avatar,
  children: [{
    label: 'Nome do Usuario',
    icon: 'person',
    children: [{
      label: store.getUser.username,
      icon: 'chevron_right',
    }, ],
  },
  {
    label: 'E-mail',
    icon: 'mail',
    children: [{
      label: store.getUser.email,
      icon: 'chevron_right',
    }, ],
  },
  {
    label: 'Conta criada em',
    icon: 'calendar_month',
    children: [{
      label: date,
      icon: 'chevron_right',
    }, ],
  },
  {
    label: 'Cargo do Usuario',
    icon: 'leaderboard',
    children: [{
      label: store.getUser.infos.role,
      icon: 'chevron_right',
    }, ],
  },
  {
    label: 'ID do Usuario',
    icon: 'numbers',
    children: [{
      label: store.getUser.id,
      icon: 'chevron_right',
    }, ],
  },
  ],
}, ];
</script>

<template>
  <div class="tableColumn">
    <q-tree
      :nodes="simple"
      no-connectors
      node-key="label"
      v-model:expanded="expanded"
      class="tree-column"
      default-expand-all
    />
  </div>
</template>
