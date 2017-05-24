import Vue from 'vue'
import Topic from './components/core/Topic.vue'

new Vue({
  el: '#app',

  render(h) {
    return h(Topic)
  }
});