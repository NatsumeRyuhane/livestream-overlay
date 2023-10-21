<script setup lang="ts">
  import LivestreamHeader from "./components/Header.vue"
  import Stage from "./components/Stage.vue"
  import LivestreamFooter from "./components/Footer.vue"
</script>

<template>
  <div id="container">
    <LivestreamHeader id="header" />
    <Stage id="main-stage" />
    <LivestreamFooter id="footer" />
    <div id="blur" />
  </div>
</template>

<style lang="scss">
  @import "style.scss";

  body {
    width: 1920px;
    height: 1080px;
    margin: 0;
    
    background: transparent;
  }

  #container {
    position: absolute;
    width: 1920px;
    height: 1080px;

    background-image: url("./assets/background.png");
    background-size: cover;

    overflow: hidden;
  }

  #header {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 125px;
    box-sizing: border-box;
  }

  #main-stage {
    position: absolute;
    left: 26px;
    top: 125px;
  }

  #footer {
    position: absolute;
    left: 0;
    bottom: 0;

    height: 93.75px;
  }
</style>
