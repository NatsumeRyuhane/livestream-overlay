<script lang="ts" setup>
import LivestreamHeader from "./components/Header.vue";
import LivestreamFooter from "./components/Footer.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import { ref } from "vue";
import NoStageLayout from "./layouts/NoStageLayout.vue";

let layouts = [
    ref("default-layout"),
    ref("no-stage-layout")
];

let activeLayout = ref(0);

function switchLayout() {
    activeLayout.value += 1;
    if (activeLayout.value == layouts.length) {
        activeLayout.value = 0;
    }
}
</script>

<template>
    <div id="app-container">
        <LivestreamHeader id="header" @SwitchLayout="switchLayout"/>
        <div id="layout-container">
            <DefaultLayout v-if="activeLayout === 0"/>
            <NoStageLayout v-if="activeLayout === 1"/>
        </div>
        <LivestreamFooter id="footer" />
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
    top: 0;
    left: 0;
    width: 1920px;
    height: 1080px;

    background-image: url("./assets/background.png");
    background-size: cover;

    overflow: hidden;

    @include flex-vertical;
}

#header {
    width: 100%;
    height: 125px;
    box-sizing: border-box;

    overflow: hidden;
}

#layout-container {
    position: relative;
    width: 100%;
    overflow: hidden;

    flex-grow: 1;
}


#footer {
    width: 100%;
    height: 93.75px;
}
</style>