<script setup lang="ts">
    import { ref } from 'vue'

    var year = ref("????");
    var month = ref("??");
    var day = ref("??");
    var hour = ref("??");
    var minute = ref("??");
    var second = ref("??");
    var frame = ref("??");
    var hours_elapsed = ref("??")
    var minutes_elapsed = ref("??")
    var seconds_elapsed = ref("??")
    var frames_elapsed = ref("??")

    var livestream_start: Date = new Date();

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
    }, 10)

    setInterval(function(): void {
        let now: Date = new Date();
        
        let elapsed_time = now.valueOf() - livestream_start.valueOf();

        let hour_elapsed = Math.floor(elapsed_time / (3600 * 1000));
        elapsed_time -= hour_elapsed * 3600 * 1000;
        let mintue_elapsed = Math.floor(elapsed_time / (60 * 1000));
        elapsed_time -= mintue_elapsed * 60 * 1000;
        let second_elapsed = Math.floor(elapsed_time / 1000);
        elapsed_time -= second_elapsed * 1000;
        let milisec_elapsed = elapsed_time;
        let frame_elapsed = Math.floor(milisec_elapsed/60)

        hours_elapsed.value = (hour_elapsed >= 10 ? hour_elapsed.toString() : "0" + hour_elapsed.toString());
        minutes_elapsed.value = (mintue_elapsed >= 10 ? mintue_elapsed.toString() : "0" + mintue_elapsed.toString());
        seconds_elapsed.value = (second_elapsed >= 10 ? second_elapsed.toString() : "0" + second_elapsed.toString());
        frames_elapsed.value = (frame_elapsed >= 10 ? frame_elapsed.toString() : "0" + frame_elapsed.toString());

    }, 10)
</script>

<template>
    <div class="container">
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
                    <p id="time-display-frame" class="time-number">{{ frame }}</p>
                </div>
            </div>
            <div id="elapsed">
            </div>
            <div id="clock-prompt" >CURRENT TIME</div>
        </div>
        
    </div>
</template>

<style scoped lang="scss">
    @import "../style.scss";

    $clock-accent-color: lighten($secondary-accent-color, 40%);

    p {
        margin: 0;
    }

    .container {
        height: fit-content;
    }

    #time, #elapsed {
        backdrop-filter: blur(1px);
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

        font-size: 14px;
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
        font-size: 11px;
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