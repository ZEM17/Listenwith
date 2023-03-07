import { createApp } from 'vue'
import App from './App.vue'
import './style/reset.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './routes/index'
import store from './store'
const app = createApp(App)
app.use(router)
app.use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.mount('#app')
