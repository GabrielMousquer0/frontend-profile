import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import App from './App.vue';
import { router, pinia, apolloClient } from './modules/';
import { provideApolloClient } from '@vue/apollo-composable';


createApp(App)
  .use(Quasar, {
    plugins: {
      Notify,
    },
  })
  .provide(provideApolloClient(apolloClient))
  .use(router)
  .use(pinia)
  .mount('#app');
