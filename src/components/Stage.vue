<script setup lang="ts">
</script>

<template>
  <div class="container" />
</template>

<style scoped lang="scss">
    @import '../style.scss';
    $container-height: 838px;

    .container {
        width: calc($container-height * $stage-aspect-ratio-Width2Height);
        height: $container-height;

        background-color: $stage-background;
    }
</style>
