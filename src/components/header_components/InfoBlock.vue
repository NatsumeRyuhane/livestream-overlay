<script setup lang="ts">
import { onMounted, Ref, ref, defineEmits } from "vue";

const props = defineProps({
    id: Number,
    title: String,
    content: String
});

const emits = defineEmits(["BlockRemoval"]);

const decorator: Ref<null | HTMLDivElement> = ref(null);
const decoratorWrapper: Ref<null | HTMLDivElement> = ref(null);

function preventNewline(event: KeyboardEvent) {
    if (event.key === "Enter") {
        event.preventDefault();
        (event.target as HTMLElement).blur();
    }
}

onMounted(() => {
    decoratorWrapper.value?.addEventListener("mouseenter", () => {
        decorator.value?.classList.add("expanded");
    });
    decoratorWrapper.value?.addEventListener("mouseleave", () => {
        decorator.value?.classList.remove("expanded");
    });
    decoratorWrapper.value?.addEventListener("click", () => {
        if (props.id) {
            emits("BlockRemoval", props.id);
        }
    });
})
</script>

<template>
  <div class="info">
        <div class="decorator-wrapper" ref="decoratorWrapper">
            <div class="decorator" ref="decorator"/>
        </div>
        <div class="info-content-wrapper">
            <p class="info-title" contenteditable="true" @keydown="preventNewline">{{ title }}</p>
            <p class="info-content" contenteditable="true" @keydown="preventNewline">{{ content }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../../style.scss';

    [contenteditable] {
        outline: 0 solid transparent;
    }

    p {
        white-space: nowrap;
    }

    .info {
        @include flex-horizontal;

        height: 100%;
        width: fit-content;

        align-items: start;

        margin-left: 2em;

        white-space: nowrap;
    }

    .decorator-wrapper {
        width: 20px;
        height: 100%;
    }

    .decorator {
        height: 6px;
        width: 20px;

        background-color: $primary-accent-color;
        transition: all 0.2s ease;

        &.expanded {
            height: 100%;
        }
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
        padding-left: 0.25em;
        min-width: 2em;
    }

    .info-title:focus-visible {
        border-bottom: 2px solid $primary-accent-color;
        border-radius: 2px;
    }

    .info-content {
        padding-left: 2em;

        font-size: 35px;

        position: relative;
        top: -5px;
    }

    .info-content:focus-visible {
        border-bottom: 3px solid $primary-accent-color;
        border-radius: 3px;
    }
</style>
