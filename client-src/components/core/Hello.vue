<template>
  <div>
    <input v-model="helloMessage"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class App extends Vue {

    @Prop({ 'default': 'Vue!' })
    private propMessage: string;

    private helloMessage: string;

    constructor() {
      super();

      this.helloMessage = `Hello, ${this.propMessage}`;
    }

    mounted() {
      console.log(this.helloMessage);
    }

  }
</script>

