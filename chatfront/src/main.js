import 'normalize.css'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import components from '@/components'
import '@/plugins/element.js'
import '@/assets/icon'

Vue.use(components)

Vue.config.productionTip = false

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
