<template>
    <div class="container-fluid vh-100">
        <div class="row">
            <div class="col-3 bg-body-tertiary vh-100 p-0 d-flex flex-column">
                <FeedSideNavComp v-if="user" :user='{
                    username: user.username,
                    email: user.email
                }' />
                <FeedNavComponent />
            </div>
            <div class="col-6 bg-white px-3 vh-100 d-flex flex-column">
                <PostNavComponent />
                <div class="posts flex-fill overflow-auto pb-4" v-if="posts && user">
                    <PostComponent v-for="post in posts" :key="post" :user='{
                        username: post.userName,
                        profile: post.userProfile,
                        hasFullOptions: (post.userID == user.id) || user.role == "admin"
                    }' :post='{
                        image: post.postMedia,
                        comment: post.postComment,
                        time: convertTimeStamp(post.postTime),
                        userID: post.userID,
                        postID: post.postID
                    }' />
                </div>
            </div>
            <div class="col-3 p-3 vh-100 bg-white">
                <QuickChatComp />
            </div>
        </div>
        <PostEditModal />
        <SettingsModal />
        <CommentModal />
    </div>
</template>
<script>
import PostComponent from '@/components/PostComp.vue';
import PostNavComponent from '@/components/PostNavComp.vue';
import FeedNavComponent from '@/components/FeedNavComp.vue';
import FeedSideNavComp from '@/components/FeedSideNavComp.vue';
import PostEditModal from '@/components/PostEditModal.vue';
import SettingsModal from '@/components/SettingsModal.vue';
import QuickChatComp from '@/components/QuickChatComp.vue';
import CommentModal from '@/components/CommentModal.vue';

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
        FeedSideNavComp,
        PostEditModal,
        SettingsModal,
        QuickChatComp,
        CommentModal
    },
    async mounted() {
        this.$store.state.display_nav = false;
        await this.$store.dispatch('loadUser');
        await this.$store.dispatch('getPosts');

        let updater = setInterval(async ()=>{
            await this.$store.dispatch('updatePosts');
        }, 10000);

        console.log(updater);
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
<style scoped>
.quick-chat {
    background-color: rgb(151,107,182, 1);
}
</style>