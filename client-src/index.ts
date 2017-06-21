import Vue from 'vue'
import Stage from './components/core/Stage.vue'
import Store from './store'

new Vue({
  el: '#app',

  store: Store,

  render(h) {
    return h(Stage)
  }
});