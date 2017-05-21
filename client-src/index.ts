import Vue from 'vue'
import HelloComponent from './components/Hello.vue'

console.log(HelloComponent);

new Vue({
  el: '#app',

  render(h) {
    return h(HelloComponent, {
      props: {
        propMessage: 'vue!'
      }
    })
  }
});