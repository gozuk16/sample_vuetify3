import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import ganttastic from '@infectoone/vue-ganttastic'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(ganttastic)
  .mount('#app')
