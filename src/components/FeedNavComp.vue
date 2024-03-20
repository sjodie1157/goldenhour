<template>
    <div class="px-0 flex-fill w-100 overflow-auto pb-4">
        <router-link to="/" class="p-4 pb-0 d-flex align-items-center justify-content-between text-decoration-none">
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-house-door-fill position-absolute top-50 start-50 translate-middle text-primary fs-4 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Home</span>
            </div>
        </router-link>
        <div class="px-4 pt-2 pb-0 d-flex align-items-center justify-content-between text-decoration-none">
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-bookmarks position-absolute top-50 start-50 translate-middle text-warning fs-4 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Saved Posts</span>
            </div>
        </div>
        <router-link to="/feed" v-if="isAdmin" class="px-4 pt-2 pb-0 d-flex align-items-center justify-content-between text-decoration-none">
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-rss position-absolute top-50 start-50 translate-middle text-secondary fs-3 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Feed</span>
            </div>
        </router-link>
        <router-link to="/admin" v-if="isAdmin" class="px-4 pt-2 pb-0 d-flex align-items-center justify-content-between text-decoration-none">
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-person-gear position-absolute top-50 start-50 translate-middle text-secondary fs-3 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Admin</span>
            </div>
        </router-link>
        <!-- <router-link to="/contact" class="px-4 pt-2 pb-0 d-flex align-items-center justify-content-between text-decoration-none">
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-rss position-absolute top-50 start-50 translate-middle text-secondary fs-3 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Contact</span>
            </div>
        </router-link> -->
        <router-link to="/about" class="px-4 pt-2 pb-4 border-bottom border-1 pb-0 d-flex align-items-center justify-content-between text-decoration-none">
            <div class="sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-info-circle position-absolute top-50 start-50 translate-middle text-secondary fs-3 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">About</span>
            </div>
        </router-link>
        <div class="px-4 pt-4 pb-0 d-flex align-items-center justify-content-between text-decoration-none">
            <button class="bg-body-tertiary px-0 border-0 sideNav py-2 rounded-2 d-flex align-items-center justify-content-between w-100" @mouseenter="navItemEnter" @mouseleave="navItemLeave" data-bs-target="#settingsModal" data-bs-toggle="modal">
                <div class="p-4 position-relative border border-1 rounded-3 ms-3">
                    <i class="bi bi-gear-fill position-absolute top-50 start-50 translate-middle text-secondary fs-4 user-select-none"></i>
                </div>
                <span class="text-secondary mx-auto user-select-none">Account Settings</span>
            </button>
        </div>
    </div>
</template>
<script>

export default {
    name: "FeedNavComponent",
    components: {
    },
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