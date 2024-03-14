<template>
    <div class="container-fluid vh-100">
        <div class="row">
            <div class="col-3 bg-body-tertiary vh-100 p-0 d-flex flex-column">
                <FeedSideNavComp v-if="user" :user='{
                    username: user.username,
                    email: user.email
                }' />
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
                <div class="posts flex-fill overflow-auto" v-if="posts">
                    <PostComponent v-for="post in posts" :key="post" :user='{
                        username: post.userName,
                        profile: post.userProfile,
                        currentUserPost: post.userName == user.username
                    }' :post='{
                        image: post.postMedia,
                        comment: post.postComment,
                        time: convertTimeStamp(post.postTime),
                        userID: post.userID,
                        postID: post.postID
                    }' />
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
import FeedSideNavComp from '@/components/FeedSideNavComp.vue';

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
        FeedNavComponent,
        FeedSideNavComp
    },
    mounted() {
        this.$store.dispatch('loadUser');
        this.$store.state.display_nav = false;
        // let token = this.$cookies.get('token');

        this.$store.dispatch('getPosts');
        // if( !token ){
        //     this.$store.dispatch('redirect', '');
        // }
        // get feed, if cannot get feed because autherror then redirect to login page

        // console.log(1);
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        posts() {
            return this.$store.state.posts;
        }
    },
    methods: {
        convertTimeStamp(timestamp) {
            let date = new Date(timestamp);
            let options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'UTC'
            };

            let formattedDate = date.toLocaleDateString('en-US', options);

            return formattedDate
        }
    }
}
</script>
<style scoped></style>