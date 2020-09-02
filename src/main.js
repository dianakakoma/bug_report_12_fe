import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
/*process.env.NODE_ENV === "development" ? "http://localhost:8080/https://afternoon-meadow-64586.herokuapp.com/api/reports" : "/"; */

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
