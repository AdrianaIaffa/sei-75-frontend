import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import Vue3Cookies from "vue3-cookies"
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { library } from '@fortawesome/fontawesome-svg-core'

// import {v2 as cloudinary} from 'cloudinary';

// cloudinary.config({ 
//     cloud_name: 'dwgp1gpkv', 
//     api_key: '316626685257779', 
//     api_secret: '***************************' 
//   });

  
  const app = createApp(App)
  app.use(router)
  app.use(vue3GoogleLogin, {clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID})
  app.use(Vue3Cookies, {
    expireTimes: '1d',
    path: '/',
    domain: '',
    secure: true,
    sameSite: 'None'
  })
  // app.use('font-awesome-icon', FontAwesomeIcon)
  // app.use(BootstrapVue)
//   app.config.productionTip = false;

  app.mount('#app')