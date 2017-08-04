<template>
  <div>
    <ui-header :onToggleSidePanelDisplay="onToggleSidePanelDisplay.bind(this)"/>
    <ui-side-panel :show="sidePanelShown"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Header from './Header.vue'
  import SidePanel from './SidePanel.vue'
  import { Component } from 'vue-property-decorator'

  @Component({
    components: {
      'ui-header': Header,
      'ui-side-panel': SidePanel
    }
  })
  class UI extends Vue {
    /** @Data */
    sidePanelShown: boolean = false;

    /** @Helper */
    onToggleSidePanelDisplay() {
      this.sidePanelShown = !this.sidePanelShown;
    }
  }

  export default UI
</script>

<style>

</style>