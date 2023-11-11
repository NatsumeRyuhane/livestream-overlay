<script setup lang="ts">
    import { ref, Ref } from 'vue'

    var hours_elapsed = ref("??")
    var minutes_elapsed = ref("??")
    var seconds_elapsed = ref("??")
    var frames_elapsed = ref("??")

    var livestream_start: Date = new Date();
    var isBlinking: Ref<boolean> = ref(false);

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
        let frame_elapsed = Math.floor(milisec_elapsed/(1000/60))

        hours_elapsed.value = (hour_elapsed >= 10 ? hour_elapsed.toString() : "0" + hour_elapsed.toString());
        minutes_elapsed.value = (mintue_elapsed >= 10 ? mintue_elapsed.toString() : "0" + mintue_elapsed.toString());
        seconds_elapsed.value = (second_elapsed >= 10 ? second_elapsed.toString() : "0" + second_elapsed.toString());
        frames_elapsed.value = (frame_elapsed >= 10 ? frame_elapsed.toString() : "0" + frame_elapsed.toString());

    }, 5);

    function resetLivestreamTimer() {
        startBlinking();
        setTimeout(() => {
            livestream_start = new Date();
        }, 50);
    }

    function startBlinking() {
        isBlinking.value = true;
        setTimeout(() => {
            isBlinking.value = false;
        }, 200);
    }
</script>

<template>
    <div id="wrapper">
        <div id="container" @click="resetLivestreamTimer">
            <div id="time" ref="timer">
                <div id="hms" :class="{ blinking: isBlinking }">
                    <p id="time-display-hr" class="time-number">{{ hours_elapsed }}</p>
                    <p class="time-seperator">:</p>
                    <p id="time-display-min" class="time-number">{{ minutes_elapsed }}</p>
                    <p class="time-seperator">:</p>
                    <p id="time-display-sec" class="time-number">{{ seconds_elapsed }}</p>
                    <p id="time-display-frame" class="time-number">{{ frames_elapsed }}</p>
                </div>
            </div>
            <div id="clock-prompt" >LIVESTREAM TIMER</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "../style.scss";

    $clock-accent-color: $primary-accent-color;

    p {
        margin: 0;
    }

    
    #container {
        @include flex-vertical;

        align-items: start;
        justify-content: end;

        height: 100%;
    }

    #time {
        @include flex-horizontal;
        align-items: end;

        background-color: rgba(255, 255, 255, 20%);
        backdrop-filter: blur(2px);

        width: 100%;
        flex-grow: 1;
    }

    #hms {
        @include flex-horizontal; 
        width: 100%;

        font-family: outfit;
        color: $clock-accent-color;

        font-size: 18px;
        font-weight: 500;

        justify-content: start;

        &.blinking {
            animation: blink 0.4s 1 normal ease-in-out;
        }

        @keyframes blink {
            0% {
                opacity: 0;
            }
            25% {
                opacity: 1;
            }
            50% {
                opacity: 0;
            }
            75% {
                opacity: 1;
            }
        }
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
        font-size: 10px;
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
</style>