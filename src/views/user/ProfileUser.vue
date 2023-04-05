<script setup>
import ProfileCard from '../../components/ProfileComponents/card/InformationCard.vue'
import InformationCard from '../../components/ProfileComponents/card/ConfigureCard.vue'
import UserInformation from '../../components/ProfileComponents/user/UserInformations.vue'
</script>

<template>
    <q-card class="myCard">
        <q-card-section>
            <ProfileCard />
        </q-card-section>
        <q-card-section>
            <InformationCard />
        </q-card-section>
    </q-card>
        <UserInformation/>

</template>

<style scoped>
.myCard {
    width: 500px;
    height: 1000px;
    right: 137%;
    background-color: rgb(125, 126, 128);
}

</style>