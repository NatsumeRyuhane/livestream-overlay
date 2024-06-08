<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";

import Clock from "./Clock.vue"
import LivestreamTimer from './LivestreamTimer.vue';
import InfoBlock from "./header_components/InfoBlock.vue"

const emits = defineEmits(["SwitchLayout"]);

interface InfoBlock {
    id: number;
    blockTitle: string;
    blockContent: string;
}

interface InfoBlockContent {
    blockTitle: string;
    blockContent: string;
}


let infoblocks: Ref<InfoBlock[]> = ref([]);
let nextInfoBlockID: number = 0;

let presetInfoBlocks = [
    { blockTitle: "今日直播目标", blockContent: "活着下播" },
    { blockTitle: "直播群", blockContent: "670415161" },
]

function addInfoBlock(infoBlockData: null | InfoBlockContent) {
    nextInfoBlockID += 1;
    if (infoBlockData) {
        infoblocks.value.push({id: nextInfoBlockID, blockTitle: infoBlockData.blockTitle,
            blockContent: infoBlockData.blockContent});
    }
    else {
        infoblocks.value.push({id: nextInfoBlockID, blockTitle: "标题", blockContent: "内容"});
        console.log(infoblocks);
    }

}

function removeInfoBlock(id: number) {
    console.log(id)
    infoblocks.value = infoblocks.value.filter((ib) => ib.id !== id);
}

onMounted(() => {
    presetInfoBlocks.forEach((ib) => addInfoBlock(ib));
});
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <div id="deco" @click="$emit('SwitchLayout')"/>
            <div id="live-streaming-prompt">
                <h1>直播进行中</h1>
                <p id="LIVE-STREAMING">live streaming</p>
            </div>

            <LivestreamTimer id="livestream-timer" />
            <Clock id="clock" label="LOCAL TIME" />
            <Clock id="clock-cn" timezone="Asia/Shanghai" label="CN TIME"/>
            
            <div id="infoblocks">
                <InfoBlock v-for="ib in infoblocks" :id="ib.id" :title="ib.blockTitle" :content="ib.blockContent" @BlockRemoval="removeInfoBlock" />
            </div>

            <button id="btn-add-infoblock" ref="btn-Add-Infoblock" @click="addInfoBlock(null);">+</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../style.scss';

    * {
        font-family: SourceHanSerifSC, serif;
        color: rgb(50, 50, 50);
    }

    #live-streaming-prompt {
        position: relative;
        white-space: nowrap;
        user-select: none;
    }

    #LIVE-STREAMING {
        position: absolute;
        left: 80px;
        bottom: -66px;

        font-family: Abuget, sans-serif;
        font-size: 70px;
        color: $primary-accent-color;

        z-index: 10;
        transform: rotate(-10deg);
    }

    #livestream-timer {
        margin-left: 2rem;
        margin-right: 1rem;
        align-items: end;
        padding: 0;

        align-self: end;
        height: 100%;
    }

    #clock, #clock-cn {
        margin-left: 0.5rem;
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

    #deco:hover {
        cursor: pointer;
        background-color: lighten($primary-accent-color, 10%);
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
        font-family: outfit, sans-serif;
        font-size: 20px;
        font-weight: 500;

        backdrop-filter: blur(3px);

        transition: 0.25s ease-in-out;
    }

    #btn-add-infoblock:hover {
        opacity: 70%;
    }
</style>