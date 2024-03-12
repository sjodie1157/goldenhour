<template>
    <div class="top-bar border-bottom border-1 px-3 pt-4 pb-2">
        <div class="friends d-flex justify-content-start">
            <button class="btn border-2 border-secondary-subtle rounded-4 mx-1"><i
                    class="bi bi-plus-lg text-secondary"></i></button>
            <button class="btn border-2 border-primary bg-secondary rounded-4 mx-1"><i
                    class="bi bi-plus-lg text-secondary"></i></button>
            <button class="btn border-2 border-primary bg-secondary rounded-4 mx-1"><i
                    class="bi bi-plus-lg text-secondary"></i></button>
            <button class="btn border-2 border-primary bg-secondary rounded-4 mx-1"><i
                    class="bi bi-plus-lg text-secondary"></i></button>
            <button class="btn border-2 border-primary bg-secondary rounded-4 mx-1"><i
                    class="bi bi-plus-lg text-secondary"></i></button>
        </div>
        <div class="input-group my-3">
            <span class="input-group-text text-secondary" id="basic-addon1"><i class="bi bi-chat-left-text-fill"></i></span>
            <input class="form-control" type="text" placeholder="What's on your mind?"
                aria-describedby="basic-addon1" />
        </div>
    </div>
</template>
<script>
export default {
    name: "PostNavComponent"
}
</script>
<style scoped>
.form-control::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-size: small;
    text-anchor: middle;
    text-align: left;
}

.friends .btn {
    aspect-ratio: 1;
    border-color: rgba(0, 0, 0, 0.3);
}

.top-bar {
    border-color: rgba(0, 0, 0, 0.3);
}
</style>