<template>
    <div class="sideNav bg-primary-subtle" v-if="user && posts">
        <button class="btn app-btn-dark rounded-0 shadow-none" data-bs-dismiss="offcanvas"><i class="bi bi-box-arrow-right"></i></button>
        <div class="profile_and_search p-4">
            <div class="input-group mb-3 px-4">
                <span class="input-group-text border-0" id="search"><i
                        class="bi bi-search text-secondary"></i></span>
                <input @input="search" v-model="searchInput" class="form-control shadow-none border-0" type="text" placeholder="search a user or post"
                    aria-describedby="search" />
            </div>
            <div class="mt-5 mb-3 d-flex d-flex justify-content-center">
                <button ref="openSettings" data-bs-target="#settingsModal" data-bs-toggle="modal" class="d-none"></button>
                <div class="self-contact shadow bg-dark-subtle d-flex justify-content-center rounded-3" @click="openSettingsModal">
                    <div class="profile_picture position-relative m-1 bg-secondary shadow rounded-3 p-4" :style="{ 'background-image': `url(${(user.profile) ? user.profile : ''})`}">
                        <i v-if="!user.profile" class="bi bi-person-fill position-absolute fs-4 top-50 start-50 translate-middle text-white"></i>
                    </div>
                    <div class=" d-none d-lg-flex flex-column justify-content-evenly align-items-start">
                        <div class="text-truncate d-flex flex-column justify-content-evenly align-items-start">
                            <small class="ms-2 me-3 text-secondary">{{user.username}}</small>
                            <small class="ms-2 me-3 text-secondary d-flex fw-light text-truncate"
                                style="font-size: small;">{{user.email}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script scoped>
export default {
    name: "FeedSideNavComp",
    data(){
        return {
            searchInput: ""
        }
    },
    computed: {
        user(){
            return this.$store.state.user;
        },
        users(){
            return this.$store.state.users;
        },
        posts(){
            return this.$store.state.posts;
        },
        postSearch(){
            return this.$store.state.postSearch;
        }
    },
    methods: {
        openSettingsModal(){
            this.$refs.openSettings.click();
        },
        search(){
            let _searchInput = this.searchInput.toLowerCase();
            console.log('search: ', _searchInput)
            let posts = this.posts.filter( (post)=>{
                return post.postComment.toLowerCase().includes(_searchInput) || post.userName.toLowerCase().includes(_searchInput)
            } )
            this.$store.dispatch('setPostSearch', posts);

        }
    }
}
</script>
<style>
.self-contact {
    transition: 150ms ease-in-out;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
}

.form-control {
    font-size: small !important;
}
.profile_picture {
    background-position: center;
    background-size: cover;
}

</style>