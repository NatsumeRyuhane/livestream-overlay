<script setup lang="ts">
    import { ref } from 'vue'

    import Clock from "./Clock.vue"
    import LivestreamTimer from './LivestreamTimer.vue';
    import InfoBlock from "./header_components/InfoBlock.vue"

    let infoblocks = ref([
        { id: 1, blockTitle: "主包今天玩什么", blockContent: "木子猫猫" }
    ]);

    function addInfoBlock() {
        infoblocks.value.push({ id: 1, blockTitle: "标题", blockContent: "内容" });
        console.log(infoblocks);
    }
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <div id="deco" />
            <div id="live-streaming-prompt">
                <h1>直播进行中</h1>
                <p id="LIVE-STREAMING">live streaming</p>
            </div>

            <LivestreamTimer id="livestream-timer" />
            <Clock id="clock" />
            
            <div id="infoblocks">
                <InfoBlock v-for="ib in infoblocks" :title="ib.blockTitle" :content="ib.blockContent" />
            </div>

            <button id="btn-add-infoblock" @click="addInfoBlock">+</button>
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

    #livestream-timer {
        margin-left: 2rem;
        align-items: end;
        padding: 0;
        flex-shrink: 0;

        align-self: end;
        height: 100%;
    }

    #clock {
        margin-left: 1rem;
        align-items: end;
        padding: 0;
        flex-shrink: 0;

        align-self: end;
        height: 100%;
    }

    .wrapper {
        @include flex-horizontal;
        overflow-x: hidden;
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

        margin-right: 1em;
        flex-shrink: 0;
    }

    #infoblocks {
        @include flex-horizontal;
        height: 100%;
    }

    h1 {
        position: relative;
        top: -3px;

        font-size: 50px;
        font-weight: 100;
        z-index: 1;
    }

    #live-streaming-prompt {
        flex-shrink: 0;
    }

    #btn-add-infoblock {
        position: relative;
        top: 15%;
        
        height: 125%;
        width: 30px;
        margin-left: 2rem;
        background-color: lighten($secondary-accent-color, 80%);
        opacity: 5%;
        border-radius: 0.15em;
        border: 1px solid lighten($secondary-accent-color, 50%);

        color:  lighten($secondary-accent-color, 50%);
        font-family: outfit;
        font-size: 20px;
        font-weight: 500;

        backdrop-filter: blur(3px);

        transition: 0.25s ease-in-out;
    }

    #btn-add-infoblock:hover {
        opacity: 70%;
    }
</style>