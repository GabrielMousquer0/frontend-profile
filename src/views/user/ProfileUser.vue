<script setup>
import ProfileCard from '../../components/Card/InformationCard.vue';
import InformationCard from '../../components/Card/ConfigureCard.vue';
import TecnologyUser from '../../components/Profile/TecnologyUser.vue';
import InfoUser from '../../components/Profile/InfoUser.vue';
import DescriptionUser from '../../components/Profile/DescriptionUser.vue';
import ButtonMenu from '../../components/Profile/ButtonMenu.vue';
import HeaderBar from '../../components/HeaderBar.vue';
import { routerStore, useUserStore } from '../../store';
import { useRouter } from '../../utils';

const userStore = useUserStore();
const store = routerStore();
const router = useRouter();
store.router_name = 'User';


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
      <InformationCard />
    </div>
    <div>
      <div class="infoUser row fixed-start">
        <InfoUser />
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
.container {
    width: 100%;
    height: 100%;
}

.infoUser {
    margin-top: 15rem;
    margin-left: 5rem;
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