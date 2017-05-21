<template>
  <div>
    <input v-model="helloMsg"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    props: {
      propMessage: String
    }
  })

  export default class App extends Vue {

    private propMessage: string;

    private helloMsg: string;

    constructor() {
      super();

      this.helloMsg = `Hello, ${this.propMessage}`;
    }

    mounted() {
      console.log(this.helloMsg);
    }
  }
</script>

