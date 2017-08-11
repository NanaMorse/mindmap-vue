<template>
  <div>
    <p class="panel-title">Topic Style</p>
    <div class="panel-row">
      <span>Font Size :</span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'

  @Component
  class TopicPanel extends Vue {

  }

  export default TopicPanel
</script>

<style lang="scss">
  @import "panelStyle";
</style>