<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store';
import ProfileCard from '../../components/Profile/AvatarUser.vue';
import TecnologyUser from '../../components/Profile/TecnologyUser.vue';
import InfoUser from '../../components/Profile/InfoUser.vue';
import DescriptionUser from '../../components/Profile/DescriptionUser.vue';
import ButtonMenu from '../../components/Profile/ButtonMenu.vue';
import OptionsUser from '../../components/Profile/OptionsUser.vue';
import HeaderBar from '../../components/HeaderBar.vue';


const userStore = useUserStore();
const router = useRouter();

if (!userStore.getUser.id) {
  router.push({
    path: '/'
  });
}
</script>

<template>
  <HeaderBar />
  <div class="row">
    <div class="myCard q-pa-md">
      <div class="row justify-end">
        <ButtonMenu />
      </div>
      <ProfileCard />
      <div class="infoUser">
        <InfoUser />
      </div>
    </div>
    <div>
      <div class="optionsUser column fixed-top-left">
        <OptionsUser />
      </div>
      <div class="description column fixed-top">
        <DescriptionUser />
      </div>
      <div class="techs column fixed-top">
        <TecnologyUser />
      </div>
    </div>
  </div>
</template>

<style scoped>

.optionsUser {
    margin-top: 35rem;
    margin-left: 32rem;
}



.description {
    width: 50rem;
    margin-top: 5rem;
    margin-left: 30rem;
}

.techs {
    width: 10rem;
    margin-top: 30rem;
    margin-left: 60rem;
}

.myCard {
    height: 100%;
    width: 30rem;
    background-color: rgb(125, 126, 128);
}
</style>