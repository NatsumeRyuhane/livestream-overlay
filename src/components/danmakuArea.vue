<script setup lang="ts">
</script>

<template>
    <div class="container">
        <div class="danmaku-container">
            <div id="tl" class="marker"/>
            <div id="tr" class="marker"/>
            <div id="br" class="marker"/>
            <div id="bl" class="marker"/>
        </div>
        <h1>CHAT LOG</h1>
    </div>
</template>

<style scoped lang="scss">
    @import '../style.scss';
    
    .container {
        width: 100%;
        height: 100%;
        
        position: absolute;
    }

    h1 {
        color: white;
        background-color: $primary-accent-color;
        width: fit-content;
        font-family: outfit;
        padding: 0 0.25em;
        margin: 0.5em 0;
        
        font-size: 14px;
    }

    .danmaku-container {
        position: relative;
        background-color: hsla($primary-accent-color-H, $primary-accent-color-S, $primary-accent-color-L, 0.03);
        backdrop-filter: blur(4px);

        width: 100%;
        height: 100%;
    }

    .marker {
        height: 20%;
        width: 20%;

        border: 4px solid hsla($primary-accent-color-H, $primary-accent-color-S, $primary-accent-color-L, 0.8);
    }

    #tl {
        position: absolute;
        top: 0;
        left: 0;

        border-right: none;
        border-bottom: none;
    }

    #tr {
        position: absolute;
        top: 0;
        right: 0;

        border-left: none;
        border-bottom: none;
    }

    #br {
        position: absolute;
        bottom: 0;
        right: 0;

        border-left: none;
        border-top: none;
    }

    #bl {
        position: absolute;
        bottom: 0;
        left: 0;

        border-right: none;
        border-top: none;
    }
</style>
