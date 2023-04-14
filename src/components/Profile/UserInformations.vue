<script setup>
import TecnologyUser from './TecnologyUser.vue';
import InfoUser from './InfoUser.vue';
import DescriptionUser from './DescriptionUser.vue';
import ButtonMenu from './ButtonMenu.vue';
import { routerStore, useUserStore } from '../../store'
import { useRouter } from '../../utils';

const userStore = useUserStore()
const store = routerStore() 
const router = useRouter()
store.router_name = 'User'


if(!userStore.getId) {
			router.push({
				path: '/'
			})
		}
</script>

<template>
    <ButtonMenu/>
    <InfoUser/>
    <DescriptionUser/>
    <TecnologyUser/>
</template>