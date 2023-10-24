<script setup lang="ts">
import { ref } from "vue";

var footerText = ref("少女折寿中...");
var showFooterTexts = ref(true);

var displayFooterTextIndex: number = -1;

var footerTexts: string[] = [
    "如果主包突然没动静了可能是趣味生煎 也有可能是似了",
    "主包需要弹幕做测试数据 救救主包（滑跪",
    "今天不是肯德基疯狂星期四但是谁请我吃我得了一种名为碳水脂肪缺乏综合症的绝症医生说必须使用美国肯塔基州的特殊蛋白补充生物制品",
    "小毛龙终于把这个东西做完了然后决定自己占着不给香菇狐狸用",
    "我不知道这个动画具体是怎么工作的 他莫名其妙动起来了",
];

setInterval(function (): void {
    showFooterTexts.value = false;
    displayFooterTextIndex += 1;

    if (displayFooterTextIndex == footerTexts.length) {
        displayFooterTextIndex = 0;
    }

    footerText.value = footerTexts[displayFooterTextIndex];

    setTimeout(function (): void {
        showFooterTexts.value = true;
    }, 2000);
}, 7000);
</script>

<template>
    <div class="container">
        <div id="title-area">
            <img
                id="title-area-deco-img"
                src="../assets/footer-title-deco.png"
            />
            <p id="title-area-deco">XML<br />NEWS</p>
            <img id="title-area-globe" src="../assets/globe.png"/>
        </div>

        <div id="footer-texts-wrapper">
            <Transition>
                <p id="footer-texts" v-if="showFooterTexts">{{ footerText }}</p>
            </Transition>
        </div>

        <div id="deco-end" />
    </div>
</template>

<style scoped lang="scss">
@import "../style.scss";

.container {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: $secondary-accent-color;
}

#title-area {
    font-family: outfit;
    position: relative;
    top: 0;
    left: 0;
    width: 286.5px;
    height: 93.75px;

    background-color: $primary-accent-color;

    @include flex-horizontal;
}

#title-area-deco-img {
    height: 30px;
    margin: 0 31.875px;
}

#title-area-globe {
    position: absolute;
    height: 60px;
    right: 60px;
    z-index: 1;
}

#title-area-deco {
    margin: 0;
    color: white;

    font-size: 30px;
    text-shadow: 
        $primary-accent-color 3px 0 0, 
        $primary-accent-color 0 3px 0, 
        $primary-accent-color -3px 0 0, 
        $primary-accent-color 0 -3px 0;
    z-index: 10;
}

#footer-texts-wrapper {
    overflow: hidden;
    color: white;

    position: absolute;
    left: 286.5px;
    top: 0;
    width: calc(100% - 286.5px);
    height: 100%;

    padding-left: 1rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

    overflow-x: hidden;

    z-index: 11;
}

#footer-texts {
    margin: 0;
    font-size: 30px;
    text-wrap: nowrap;
    white-space: nowrap;
    font-family: MiSans;

    z-index: 10;
}

#deco-end {
    position: absolute;
    right: 0;
    top: 0;

    width: 879px;
    height: 100%;

    background-image: url("../assets/footer-deco-1.png");
    background-size: cover;

    filter: hue-rotate(calc($primary-accent-color-H * $primary-accent-color-H-coefficient * 1deg))
        saturate(calc($primary-accent-color-S * 5%))
        brightness(calc($primary-accent-color-L * 5%));

    z-index: 10;
}

.v-enter-active {
    transition: all 1s ease-in-out;
}

.v-leave-active {
    transition: all 1s ease-in-out;
}

.v-enter-from {
    transform: translateX(20px);
    opacity: 0;
}


.v-leave-to {
    transform: translateX(100px);
    opacity: 0;
}
</style>
