import Vue from 'vue'
import MindMap from './components/index.vue'
import Store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

Vue.use(MuseUI);

new Vue({
  el: '#app',

  store: Store,

  render(h) {
    return h(MindMap)
  }
});