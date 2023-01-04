import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import * as d3geo from 'vue-d3-geo';
import 'vue-d3-geo/dist/vue-d3-geo.css';
// import 'd3-simple-slider/dist/d3-simple-slider.min.js'
import 'topojson/dist/topojson.js'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
