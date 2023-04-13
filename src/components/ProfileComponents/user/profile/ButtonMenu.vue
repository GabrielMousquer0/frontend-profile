<script setup>
import { useRouter } from '../../../../utils';
import { useUserStore } from '../../../../store/UserStore';

const store = useUserStore()
const router = useRouter()

function viewUsers() {
router.push({
    path: '/list'
})
}
function logout() {
    store.$reset()
    router.push({
        path: '/'
    })
}

</script>

<template>

<q-btn-dropdown color="primary" class="btnMenu" label="Menu" icon="menu">
    <q-list>
        <q-item-section>
                <q-btn @click="viewUsers" label="Usuarios" icon="person_search"/>
                <q-btn @click="logout" label="logout" icon="logout"/>
        </q-item-section>
    </q-list>
</q-btn-dropdown>


</template>

<style scoped>
.btnMenu {
    width: 126px;
    height: 10px;
    position: absolute;
    top: 200px;
    right: 520px;
}
</style>