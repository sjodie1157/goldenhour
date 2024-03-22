<template>
    <div class="mx-3 mt-4 bg-secondary-subtle rounded-4 position-relative shadow text-white overflow-hidden border-0">
        <div class="media border-0">
            <div class="py-5"></div>
            <div class="py-5"></div>
            <div class="py-5"></div>
        </div>
    </div>
</template>
<style scoped>
.media {
    background: linear-gradient(to right, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.1), rgba(0,0,0,0.0));
    animation-name: postLoad;
    background-size: 200% auto;
    animation-duration: 1s;
    background-position: 0% 100%;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-direction: alternate;
    animation-timing-function: linear;
}

@keyframes postLoad {
    0%   {
         background-position: 0 0;
    }
    100% {
        background-position: 200% 0;
    }
}
</style>
