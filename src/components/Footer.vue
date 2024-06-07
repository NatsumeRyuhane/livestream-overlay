<script setup lang="ts">
import { ref } from "vue";

var footerText = ref("少女折寿中...");
var showFooterTexts = ref(true);

var displayFooterTextIndex: number = -1;

var footerTexts: string[] = [
    "随便开播 随时下播 其实不是很建议点进来看...",
    "...这话我其实写直播间封面上了，不过我猜你肯定没看。",
    "这个遮罩是用vue写的！虽然一开始很难用但是习惯之后vue真是好文明.jpg",
    "如果主包突然没动静了可能是趣味生煎 也有可能是似了",
    "小毛龙终于把这个东西做完了然后决定自己占着不给香菇狐狸用",
    "其实我不知道这个字幕动画具体是怎么写出来的的 他莫名其妙动起来了",
    "群友问我什么时候搞sc我说现在这个弹幕量谁来发那都全是sc",
    "{Error Loading footer_banner_text[6]: Received Error [HTTP 502]}",
    "你好今天不是星期四但是请v我50我有一种称为碳水脂肪不足的综合症必须使用美国肯塔基一家尖端生物科技公司的最新型生物制剂进行治疗",
    "wei？zaima？",
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
        <div id="deco-end" />

<!--        <div id="footer-texts-wrapper">
            <Transition>
                <p id="footer-texts" v-if="showFooterTexts">{{ footerText }}</p>
            </Transition>
        </div>

        <div id="title-area">
            <img
                id="title-area-deco-img"
                src="../assets/footer-title-deco.png"
            />
            <p id="title-area-deco">XML<br />NEWS</p>
            <img id="title-area-globe" src="../assets/globe.png"/>
        </div>-->
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
    font-family: outfit, sans-serif;
    position: absolute;
    top: 0;
    right: 0;
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
    left: 0;
    top: 0;
    width: calc(100% - 286.5px);
    height: 100%;

    padding-left: 1rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

    z-index: 11;
}

#footer-texts {
    margin: 0;
    font-size: 30px;
    text-wrap: nowrap;
    white-space: nowrap;
    font-family: MiSans, sans-serif;

    z-index: 10;
}

#deco-end {
    position: absolute;
    //right: 286.5px;
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
