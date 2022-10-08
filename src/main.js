import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import pinia from "./config/pinia.js";
import router from "./config/router.js";

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
