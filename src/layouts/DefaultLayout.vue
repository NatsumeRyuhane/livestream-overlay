<script setup lang="ts">
    import Stage from "../components/Stage.vue"
    import DanmakuArea from "../components/danmakuArea.vue";
</script>

<template>
    <Stage id="main-stage" />
    <DanmakuArea id="danmaku" />
</template>

<style lang="scss">
@import "../style.scss";

#main-stage {
    position: absolute;
    right: 26px;
    top: 0;

    box-shadow: 0 0 8px #D1D2D3;
}

#danmaku {
    position: absolute;
    width: 500px;
    height: 500px;

    top: 0;
    left: 26px;
}
</style>