<template>
    <div class="text-white dummy-text position-relative">
        Sign Up
        <span class="spinner position-absolute p-2 rounded-circle border border-2 start-50 top-50"></span>
    </div>
</template>
<style scoped>
.dummy-text {
    color: transparent !important;
}
.spinner {
    animation-name: buttonLoader;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    animation-iteration-count: infinite;
    border-bottom-color: transparent !important;
    border-top-color: transparent !important;
    /* border-bottom-color: transparent; */
}

@keyframes buttonLoader {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>