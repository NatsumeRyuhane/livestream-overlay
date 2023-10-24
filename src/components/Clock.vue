<script setup lang="ts">
    import { ref } from 'vue'

    var year = ref("????");
    var month = ref("??");
    var day = ref("??");
    var hour = ref("??");
    var minute = ref("??");
    var second = ref("??");
    var frame = ref("??");

    setInterval(function(): void {
        let now: Date = new Date();
        
        year.value = now.getFullYear().toString();
        month.value = (now.getMonth() + 1 >= 10 ? (now.getMonth() + 1).toString() :  "0" + (now.getMonth() + 1).toString());
        day.value = (now.getDate() >= 10 ? now.getDate().toString() :  "0" + now.getDate().toString());
        hour.value = (now.getHours() >= 10 ? now.getHours().toString() :  "0" + now.getHours().toString());
        minute.value = (now.getMinutes() >= 10 ? now.getMinutes().toString() :  "0" + now.getMinutes().toString());
        second.value = (now.getSeconds() >= 10 ? now.getSeconds().toString() :  "0" + now.getSeconds().toString());
        let frames: number = Math.floor(now.getMilliseconds() / (1000/60));
        frame.value = (frames >= 10 ? frames.toString() :  "0" + frames.toString());
    }, 50)
</script>

<template>
    <div id="wrapper">
        <div id="container">
            <div id="clock-time">
                <div id="time">
                    <div class="date-display" id="date">
                        <p id="time-display-year" class="time-number">{{ year }}</p>
                        <p class="date-seperator">-</p>
                        <p id="time-display-month" class="time-number">{{ month }}</p>
                        <p class="date-seperator">-</p>
                        <p id="time-display-day" class="time-number">{{ day }}</p>
                    </div>
                    <div class="time-display" id="hms">
                        <p id="time-display-hr" class="time-number">{{ hour }}</p>
                        <p class="time-seperator">:</p>
                        <p id="time-display-min" class="time-number">{{ minute }}</p>
                        <p class="time-seperator">:</p>
                        <p id="time-display-sec" class="time-number">{{ second }}</p>
                    </div>
                </div>
                <div id="clock-prompt" >CURRENT TIME</div>
            </div>
        </div>
</div>
</template>

<style scoped lang="scss">
    @import "../style.scss";

    $clock-accent-color: lighten($secondary-accent-color, 40%);

    p {
        margin: 0;
    }

    #container {
        @include flex-vertical;

        align-items: start;
        justify-content: end;
        overflow: hidden;

        height: 100%;
    }

    #time {
        background-color: rgba(255, 255, 255, 20%);
        backdrop-filter: blur(2px);
    }

    #clock-prompt {
        background-color: $clock-accent-color;
        font-family: outfit;
        color: white;
        box-sizing: border-box;
        padding: 0 .25em;

        font-size: 14px;
        font-weight: 700;

        width: 100%;
        opacity: 90%;
    }

    .time-display, .date-display {
        @include flex-horizontal; 

        font-family: outfit;
        color: $clock-accent-color;

        font-size: 18px;
        font-weight: 500;

        justify-content: start;
    }

    .date-display {
        width: fit-content;
    }

    .time-display .time-number {
        width: fit-content;

        @include flex-horizontal;
        justify-content: center;
    }

    .time-seperator, .date-seperator {
        position: relative;
        top: -0.125em;
        margin: 0 0.1em;
        background-color: rgba(0, 0, 0, 0);
    }

    #date {
        font-size: 8px;
        justify-content: start;
        font-weight: 300;
    }

    #time-date {
        @include flex-horizontal;
    }

    #time-display-frame {
        margin-left: auto;
        opacity: 50%;
    }
</style>