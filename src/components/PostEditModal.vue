<template>
    <div class="modal fade" id="postEdit">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-0">
                <div class="modal-header row g-0 px-3 pt-3">
                    <div class="col d-flex justify-content-between align-items-center">
                        <h4 class="display-4 fs-4 text-secondary">Edit Post</h4>
                        <button class="btn-close border-0 shadow-none" data-bs-dismiss="modal"></button>
                    </div>
                </div>
                <div class="modal-body">
                    <form ref="postForm" class="d-flex flex-column justify-content-center align-items-center"
                        enctype="multipart/form-data">
                        <div class="">
                            <textarea v-if="post" v-model="post.comment" style="resize: none" class="form-control" name="comment" id="" cols="70" rows="4"
                                placeholder="edit your comment"></textarea>
                        </div>
                        <div class="">
                            <button class="btn border-0 bg-primary-subtle my-2" @click="submitForm">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PostEditModal",
    mounted() {
    },
    data(){
        return {
            postData: {
                comment: ''
            }
        }
    },
    methods: {
        submitForm(event){
            event.preventDefault();

            let payload = {
                postID: this.post.postID,
                media: this.post.image,
                comment: this.post.comment
            }

            this.$store.dispatch('editPost', payload);
        },
        async setPost(){
            await this.$store.dispatch('setCurrentEditPost', null);
        }
    },
    computed: {
        post(){
            return this.$store.state.currentEditPost;
        }
    }
}
</script>