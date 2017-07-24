<template>
  <div>
    <ui-header />
    <core-stage />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { State } from 'vuex-class'
  import Header from './ui/Header.vue'
  import Stage from './core/Stage'
  import { mapInfo } from 'client-src/interface'

  @Component({
    components: {
      'core-stage': Stage,
      'ui-header': Header
    }
  })
  class MindMap extends Vue {
    @State('map') map: mapInfo;
  }

  export default MindMap;
</script>

<style lang="scss" scoped>

</style>