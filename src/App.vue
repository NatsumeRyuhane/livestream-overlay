<script setup lang="ts">
  import LivestreamHeader from "./components/Header.vue"
  import Stage from "./components/Stage.vue"
  import LivestreamFooter from "./components/Footer.vue"
  import DanmakuArea from "./components/danmakuArea.vue"; 
</script>

<template>
  <div id="app-container">
    <LivestreamHeader id="header" />
    <Stage id="main-stage" />
    <LivestreamFooter id="footer" />
    <DanmakuArea id="danmaku" />

    <div id="copyright">
      <p>Designed by @木子猫</p>
      <p>Made with Vue by @夏目龙羽</p>
    </div>
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

  #app-container {
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

    overflow: hidden;
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

  #danmaku {
    width: 500px;
    height: 500px;

    top: 125px;
    left: 1392px;
  }

  #copyright {
    @include flex-vertical;
    align-items: end;

    width: fit-content;
    height: fit-content;

    position: absolute;
    right: 0.5em;
    bottom: 94px;
    
    font-family: MiSans;
    color: $secondary-accent-color;
    font-style: italic;

    opacity: 0.3;
  }

  #copyright p {
    margin: 0;
  }
</style>