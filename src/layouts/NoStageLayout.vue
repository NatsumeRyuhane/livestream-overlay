<script setup lang="ts">
import DanmakuArea from "../components/danmakuArea.vue";
</script>

<template>
    <DanmakuArea id="danmaku" />
</template>

<style lang="scss">
@import "../style.scss";

#danmaku {
    position: absolute;
    width: 500px;
    height: 500px;

    top: 0;
    left: 26px;
}
</style>