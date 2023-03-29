import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import App from './App.vue';
import { villus, router } from './modules/';

createApp(App)
  .use(Quasar, {
    plugins: {
      Notify,
    },
  })
  .use(villus)
  .use(router)
  .mount('#app');
