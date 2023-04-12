<script setup>
import { routerStore} from '../store/RouterStore';

const store = routerStore()

</script>
<template>
    <div>
        <q-layout view="lHh lpr lFf">
            <q-header elevated>
                <q-toolbar class="q-ma-md justify-center">
                    <q-avatar size="100px" icon="person" />
                    <span class="textStyle text-h1">{{ store.getName }} Profile</span>
                </q-toolbar>
            </q-header>
        </q-layout> 
    </div>
</template>

<style>
.textStyle {
    font-size: 5rem;
    font-family: "Open Sans", sans-serif;
}
</style>