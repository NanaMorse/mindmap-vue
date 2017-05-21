import Vue from 'vue'
import HelloComponent from './components/core/Hello.vue'

new Vue({
  el: '#app',

  render(h) {
    return h(HelloComponent)
  }
});