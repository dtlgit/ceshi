import '@/assets/css/main.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './index.vue'
import Loading from '@/components/loading.vue'

const app = createApp(App)

app.use(createPinia())
app.component('Loading', Loading)

app.mount('#about')
