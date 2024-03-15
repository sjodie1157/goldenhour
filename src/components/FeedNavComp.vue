<template>
    <div class="px-0 flex-fill w-100">
        <div class="p-4 pb-0 d-flex align-items-center justify-content-between">
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-house-door-fill position-absolute top-50 start-50 translate-middle text-primary fs-4 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Home</span>
            </div>
        </div>
        <div class="px-4 pt-2 pb-0 d-flex align-items-center justify-content-between" >
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-bookmarks position-absolute top-50 start-50 translate-middle text-warning fs-4 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Saved Posts</span>
            </div>
        </div>
        <div v-if="isAdmin" class="px-4 pt-2 pb-0 d-flex align-items-center justify-content-between">
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-rss position-absolute top-50 start-50 translate-middle text-secondary fs-3 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Feed</span>
            </div>
        </div>
        <div v-if="isAdmin" class="px-4 pt-2 pb-0 d-flex align-items-center justify-content-between">
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-person-gear position-absolute top-50 start-50 translate-middle text-secondary fs-3 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Admin</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "FeedNavComponent",
    computed: {
        isAdmin(){
            return this.$store.state.isAdmin;
        }
    },
    methods: {
        navItemEnter(event){
            let elem = event.target;
            let previous = elem.getAttribute('class').split(' ');

            previous.push('shadow');

            elem.setAttribute('class', previous.join(' '));
        },
        navItemLeave(event){
            let elem = event.target;
            let previous = elem.getAttribute('class').split(' ');

            previous = previous.filter( (item)=> item != 'shadow' );

            elem.setAttribute('class', previous.join(' '));
        }
    }
}
</script>
<style>
.sideNav {
    transition: 300ms ease;
    cursor: pointer;
}
</style>