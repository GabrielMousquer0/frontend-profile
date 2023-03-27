import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { villus, router } from './modules'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'

createApp(App)
.use(Quasar, {
  plugins: {}, 
})
.use(villus)
.use(router)
.mount('#app')
