import Vue from 'vue'
import Stage from './components/core/Stage.vue'
import testData from './testData'

new Vue({
  el: '#app',

  render(h) {
    return h(Stage, {
      props: {
        stageInfo: testData.stage,
        mapInfo: testData.map
      }
    })
  }
});