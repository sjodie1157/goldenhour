<template>
    <div class="mx-3 mt-4 bg-secondary-subtle rounded-4 position-relative shadow text-white overflow-hidden">
        <div class="media" :style='{
            "background-image": `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${post.image})`
        }'>
            <div class="d-flex p-2 align-items-center justify-content-between">
                <div class="self-contact d-flex justify-content-center rounded-4">
                    <div class="profile_picture position-relative m-1 bg-secondary shadow rounded-4 p-4" :style='{
            "background-image": `url(${user.profile})`
        }'><i class="bi bi-person-fill position-absolute fs-4 top-50 start-50 translate-middle text-white"
                            v-if="!user.profile"></i></div>
                    <div class=" d-none d-lg-flex flex-column justify-content-evenly align-items-start">
                        <div class="text-truncate d-flex flex-column justify-content-evenly align-items-start">
                            <small class="username ms-2 me-3 text-white user-select-none">{{ user.username }}</small>
                            <small class="datetime ms-2 me-3 text-white user-select-none">{{ post.time }}</small>
                        </div>
                    </div>
                </div>
                <div class="p-2">
                    <button class="btn border-0 p-2 m-0" @click="toggleDropDown"><i
                            class="bi bi-three-dots-vertical fs-5 text-white"></i></button>
                </div>
            </div>
            <div class="py-4" v-if="post.image"></div>
            <div class="py-5" v-if="post.image"></div>
            <div class="py-4" v-if="post.image"></div>
            <div class="p-2 bg-white text-dark d-flex flex-column align-items-start border-bottom border-1">
                <div class="tags text-secondary px-2">
                    <small class="m-2">#happynewyear</small>
                    <small class="m-2">#countdown</small>
                    <small class="m-2">#2024</small>
                </div>
                <small class="fw-normal mx-2 mt-4 mb-3">{{ post.comment }}</small>
            </div>
            <div class="bg-white p-2 d-flex align-items-center justify-content-between">
                <div>
                    <button class="btn btn-light text-secondary mx-1">
                        <span><i class="bi bi-hand-thumbs-up-fill"></i></span> <small>Like</small></button>
                    <button class="btn btn-light text-secondary mx-1" data-bs-target="#commentsModal" data-bs-toggle="modal" @click="getComments">
                        <span><i class="bi bi-chat-text-fill"></i></span> <small>Comment</small></button>
                </div>
                <div v-if="post.lastEditedTime" class="d-flex flex-column px-2 py-1 user-select-none">
                    <div class="ms-2">
                        <small class="text-secondary datetime">Last Edited:</small>&nbsp;
                        <small class="text-secondary datetime">{{ post.lastEditedBy }}</small>
                    </div>
                    <small class="datetime ms-2 me-3 text-secondary">{{ post.lastedEditedTime }}</small>
                </div>
            </div>
        </div>
        <div ref="dropdown" show-dropdown="false"
            class="app-dropdown clearfix position-absolute bg-white top-0 end-0 py-0 rounded-2 w-25 m-5 shadow text-dark border border-secondary-subtle border-2 overflow-hidden">
            <button class="btn btn-outline-secondary w-100 py-2 my-0 border-0 rounded-0"><i
                    class="bi bi-person-circle me-2"></i><small class="me-2">User Profile</small></button>
            <button class="btn btn-outline-secondary w-100 py-2 my-0 border-0 rounded-0"><i
                    class="bi bi-clipboard me-2"></i><small class="me-2">Copy Link</small></button>
            <button class="btn btn-outline-secondary w-100 py-2 my-0 border-0 rounded-0" v-if="user.hasFullOptions"><i
                    class="bi bi-chat-text-fill me-2"></i><small class="me-2">Comments</small></button>
            <button class="btn btn-outline-secondary w-100 py-2 my-0 border-0 rounded-0" v-if="user.hasFullOptions"
                data-bs-target="#postEdit" data-bs-toggle="modal"><i class="bi bi-pencil-square me-2"></i><small
                    class="me-2" @click="setPost">Edit Post</small></button>
            <button ref="post" class="btn btn-danger w-100 py-2 my-0 border-0 rounded-0" v-if="user.hasFullOptions"
                @click="deletePost"><i class="bi bi-trash me-2"></i><small
                    class="me-2">Delete</small></button>
        </div>
    </div>
</template>
<script>

export default {
    name: "PostComponent",
    props: {
        user: Object,
        post: Object
    },
    components: {
    },
    data() {
        return {}
    },
    mounted() {
    },
    methods: {
        toggleDropDown() {
            let elem = this.$refs.dropdown;
            let state = elem.getAttribute('show-dropdown')
            if (state.toLowerCase() === "true") {
                elem.style['display'] = 'none';
                elem.setAttribute('show-dropdown', 'false');
            } else {
                elem.style['display'] = 'block';
                elem.setAttribute('show-dropdown', 'true');
            }
        },
        async deletePost() {
            console.log('postID: ', this.post.postID);
            await this.$store.dispatch('deletePost', this.post.postID);
        },
        async setPost(){
            await this.$store.dispatch('setCurrentEditPost', this.post)
        },
        async getComments(){
            await this.$store.dispatch('getPostComments', this.post.postID)
        }
    }
}
</script>
<style scoped>
.profile_picture {
    background-size: cover;
    background-position: center;
}

.self-contact {
    transition: 200ms ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
}

.media {
    background-position: center;
    background-size: cover;
}

.datetime {
    font-size: x-small;
}

.app-dropdown {
    display: none;
    animation-name: fadeIn;
    animation-duration: 400ms;
    transform: translateY(-14%) !important;
    animation-fill-mode: forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: scale(0%) translate(100%, -100%);
    }

    100% {
        opacity: 1;
        transform: scale(100%);
    }
}

/* @keyframes fadeOut {
    0% {
        opacity: 1;
        transform: scale(100%);
    }
    100% {
        opacity: 0;
        transform: scale(0%);
    }
} */
</style>