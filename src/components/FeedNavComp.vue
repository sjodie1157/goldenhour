<template>
    <div class="px-0 flex-fill w-100">
        <div class="mt-4 px-4 d-flex align-items-center justify-content-center">
            <div class="w-25 ratio ratio-1x1 d-flex align-items-center justify-content-center">
                <span class="text-primary border border-1 rounded-3 d-flex align-items-center justify-content-center"><i
                        class="bi bi-house-door-fill"></i></span>
            </div>
            <div class="w-75 user-select-none text-secondary d-flex px-3">Home</div>
        </div>
        <div class="mt-2 px-4 d-flex align-items-center justify-content-center">
            <div class="w-25 ratio ratio-1x1 d-flex align-items-center justify-content-center">
                <span class="text-warning border border-1 rounded-3 d-flex align-items-center justify-content-center"><i
                        class="bi bi-bookmarks-fill"></i></span>
            </div>
            <div class="w-75 user-select-none text-secondary d-flex px-3">Saved Posts</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "FeedNavComponent"
}
</script>