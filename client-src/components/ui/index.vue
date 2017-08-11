<template>
  <div>
    <ui-header/>
    <ui-side-panel/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Header from './Header.vue'
  import SidePanel from './SidePanel'
  import { Component } from 'vue-property-decorator'

  @Component({
    components: {
      'ui-header': Header,
      'ui-side-panel': SidePanel
    }
  })
  class UI extends Vue {}

  export default UI
</script>

<style>

</style>