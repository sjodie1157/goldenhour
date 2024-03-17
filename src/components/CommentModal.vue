<template>
    <div class="modal fade" id="commentsModal">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content p-2">
                {{post}}
                {{comments}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CommentModal",
    props: {
        postID: String
    },
    mounted(){
    },
    methods: {
    },
    computed: {
        post(){
            return this.$store.state.currentEditPost;
        },
        comments(){
            return this.$store.state.postComments;
        }
    }
}
</script>