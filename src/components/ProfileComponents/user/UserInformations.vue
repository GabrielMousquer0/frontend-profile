<script setup>
import TecnologyUser from './profile/TecnologyUser.vue';
import InfoUser from './profile/InfoUser.vue';
import DescriptionUser from './profile/DescriptionUser.vue';
import ButtonMenu from './profile/ButtonMenu.vue';
import { routerStore } from '../../../store/RouterStore'
import { useUserStore } from '../../../store/UserStore';
import { useRouter } from '../../../utils';

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