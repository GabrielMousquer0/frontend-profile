<script setup>
import { storeToRefs } from '../../utils/';
import { useUserStore } from '../../store/UserStore.js'

const store = useUserStore()
const { getId } = storeToRefs(store)

</script>

<template>
<div>
    <span class="h1-text">User Profile {{ getId }}</span>
</div>

</template>