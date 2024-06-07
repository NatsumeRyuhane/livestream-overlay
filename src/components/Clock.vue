<script setup lang="ts">
    import { ref, defineProps } from "vue";

    const props = defineProps({
        timezone: {
            type: String,
            default: null
        },
        label: {
            type: String,
            default: "CURRENT TIME"
        }
    });

    let year = ref("????");
    let month = ref("??");
    let day = ref("??");
    let hour = ref("??");
    let minute = ref("??");
    let second = ref("??");
    let frame = ref("??");

    setInterval(function(): void {
        let now: Date = new Date();
        if (props.timezone) {
            let formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: props.timezone,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });

            let parts = formatter.formatToParts(now);
            ({year: year.value, month: month.value, day: day.value, hour: hour.value, minute: minute.value, second: second.value} = Object.fromEntries(parts.map(({type, value}) => [type, value])));
        } else {
            // timezone unspecified, using local time
            year.value = now.getFullYear().toString();
            month.value = (now.getMonth() + 1 >= 10 ? (now.getMonth() + 1).toString() :  "0" + (now.getMonth() + 1).toString());
            day.value = (now.getDate() >= 10 ? now.getDate().toString() :  "0" + now.getDate().toString());
            hour.value = (now.getHours() >= 10 ? now.getHours().toString() :  "0" + now.getHours().toString());
            minute.value = (now.getMinutes() >= 10 ? now.getMinutes().toString() :  "0" + now.getMinutes().toString());
            second.value = (now.getSeconds() >= 10 ? now.getSeconds().toString() :  "0" + now.getSeconds().toString());
        }

        // frame number is calculated based on the current millisecond, timezone independent
        let frames: number = Math.floor(now.getMilliseconds() / (1000/60));
        frame.value = (frames >= 10 ? frames.toString() :  "0" + frames.toString());
    }, 10)
</script>

<template>
    <div>
        <div id="container">
            <div id="clock-time">
                <div id="time">
                    <div class="date-display" id="date">
                        <p id="time-display-year" class="time-number">{{ year }}</p>
                        <p class="date-separator">-</p>
                        <p id="time-display-month" class="time-number">{{ month }}</p>
                        <p class="date-separator">-</p>
                        <p id="time-display-day" class="time-number">{{ day }}</p>
                    </div>
                    <div class="time-display" id="hms">
                        <p id="time-display-hr" class="time-number">{{ hour }}</p>
                        <p class="time-separator">:</p>
                        <p id="time-display-min" class="time-number">{{ minute }}</p>
                        <p class="time-separator">:</p>
                        <p id="time-display-sec" class="time-number">{{ second }}</p>
                    </div>
                </div>
                <div id="clock-prompt" >{{ label }}</div>
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
        min-width: 125px;
    }

    #clock-prompt {
        background-color: $clock-accent-color;
        font-family: outfit,sans-serif;
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

        font-family: outfit,sans-serif;
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

    .time-separator, .date-separator {
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