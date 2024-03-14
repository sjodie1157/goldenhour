<template>
    <div class="container-fluid vh-100">
        <div class="row">
            <div class="col-3 bg-white vh-100 p-0 d-flex flex-column">
                <div class="bg-primary-subtle">
                    <div class="profile_and_search p-4 d-flex flex-column align-items-center">
                        <div class="input-group mb-4">
                            <span class="input-group-text" id="basic-addon1"><i
                                    class="bi bi-search text-secondary"></i></span>
                            <input class="form-control" type="text" placeholder="search"
                                aria-describedby="basic-addon1" />
                        </div>
                        <div class="mt-3 d-flex flex-fill">
                            <div class="self-contact bg-dark-subtle d-flex justify-content-center mt-1 rounded-3">
                                <div class="profile_picture m-1 bg-secondary shadow rounded-3 p-4"></div>
                                <div class=" d-none d-lg-flex flex-column justify-content-evenly align-items-start">
                                    <div
                                        class="text-truncate d-flex flex-column justify-content-evenly align-items-start">
                                        <small class="ms-2 me-3 text-white">MrBud</small>
                                        <small class="ms-2 me-3 text-white d-flex fw-light text-truncate"
                                            style="font-size: x-small;">solocyberengineer@gmail.com</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FeedNavComponent />
                <div class="p-3 d-flex justify-content-center">
                    <button
                        class="btn bg-secondary-subtle border-2 border-secondary-subtle p-1 fw-normal px-2 shadow fs-7">
                        <span><i class="bi bi-gear-fill ms-1"></i></span>
                        <small class="mx-2">Settings</small>
                    </button>
                </div>
            </div>
            <div class="col-6 bg-white px-3 vh-100 d-flex flex-column">
                <PostNavComponent />
                <div class="posts flex-fill overflow-auto">
                    <PostComponent />
                    <PostComponent />
                </div>
            </div>
            <div class="col-3 bg-danger vh-100">asd</div>
        </div>
    </div>
</template>
<script>
import PostComponent from '@/components/PostComp.vue';
import PostNavComponent from '@/components/PostNavComp.vue';
import FeedNavComponent from '@/components/FeedNavComp.vue'

export default {
    name: "FeedView",
    data() {
        return {
            token: null
        }
    },
    components: {
        PostComponent,
        PostNavComponent,
        FeedNavComponent
    },
    mounted() {
        // username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/
        this.$store.state.display_nav = false;
        // let token = this.$cookies.get('token');
        // if( !token ){
        //     this.$store.dispatch('redirect', '');
        // }
        // get feed, if cannot get feed because autherror then redirect to login page

        // console.log(1);
    }
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

.profile_picture {
    aspect-ratio: 1;
}
</style>