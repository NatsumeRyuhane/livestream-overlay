<script setup lang="ts">
    import Clock from "./Clock.vue"
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <div id="deco" />
            <div id="live-streaming-prompt">
                <h1>直播进行中</h1>
                <p id="LIVE-STREAMING">live streaming</p>
            </div>

            <Clock id="clock" />

            <div class="info">
                <div class="decorator" />
                <div class="info-content-wrapper">
                    <p class="info-title">主包今天玩什么</p>
                    <p class="info-content">木子猫猫猫猫猫猫猫</p>
                </div>
            </div>

            <div class="info">
                <div class="decorator" />
                <div class="info-content-wrapper">
                    <p class="info-title">主包今天不玩什么</p>
                    <p class="info-content">小毛龙</p>
                </div>
            </div>

            <div class="info">
                <div class="decorator" />
                <div class="info-content-wrapper">
                    <p class="info-title">主包今天玩坏了什么</p>
                    <p class="info-content">盐酸狐狸</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../style.scss';

    * {
        font-family: SourceHanSerifSC;
        color: rgb(50, 50, 50);
    }

    #LIVE-STREAMING {
        position: absolute;
        left: 181px;
        bottom: -76px;

        font-family: Abuget;
        font-size: 70px;
        color: $primary-accent-color;

        z-index: 10;
        transform: rotate(-10deg);
    }

    #clock {
        align-items: end;
        padding: 0;
    }

    .wrapper {
        @include flex-horizontal;
    }

    .container {
        height: 51.05px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;

        padding: 0 25.75px;
    }

    #livestream-heading {
        position: absolute;
        left: 25.75px;
        top: 36.72px;

        display: flex;
    }

    #deco {
        width: 51.05px;
        height: 51.05px;
        background-color: $primary-accent-color;

        margin-right: 1rem;
    }

    h1 {
        position: relative;
        top: -3px;

        font-size: 50px;
        font-weight: 100;

        margin: 0 2rem 0 0;


        z-index: 1;
    }

    .info {
        @include flex-horizontal;

        height: 100%;
        width: fit-content;

        align-items: start;

        margin-left: 4rem;
    }

    .decorator {
        height: 6px;
        width: 20px;

        background-color: $primary-accent-color;
    }

    .info-content-wrapper {
        @include flex-vertical;
        
        align-items: start;
        justify-content: start;

        position: relative;
        top: -10px;
    }

    .info-content-wrapper > p {
        margin: 0;
    }

    .info-title {
        font-size: 25px;
    }

    .info-content {
        padding-left: 2em;

        font-size: 35px;

        position: relative;
        top: -5px;
    }
</style>