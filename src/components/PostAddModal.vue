<template>
    <div class="modal fade" id="postAdd">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content p-0">
                <div class="modal-header row g-0 px-3 pt-3">
                    <div class="col d-flex justify-content-between align-items-center">
                        <h4 class="display-4 fs-4">Add Post</h4>
                        <button class="btn-close border-0 shadow-none" data-bs-dismiss="modal"></button>
                    </div>
                </div>
                <div class="modal-body">
                    <div ref='postImage' class="post-image p-5 mt-3 bg-secondary rounded-0 w-100 position-relative">
                        <div class="p-5">
                            <div class="p-5">
                                <div class="position-absolute top-50 start-50 translate-middle">
                                    <h5 class="display-5 fs-3 text-white"><i class="bi bi-image-fill"></i></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form ref="postForm" class="d-flex flex-column justify-content-center align-items-center"
                        enctype="multipart/form-data">
                        <div class="row g-0 d-flex w-50 justify-content-center">
                            <img ref="display">
                            <input ref='fileUpload' type="file" class="d-none" @change="showImage">
                            <button type="button" class="btn border-0 bg-primary-subtle m-2" @click="browseFile">
                                <i class="bi bi-upload me-2"></i>Upload Image
                            </button>
                        </div>
                        <div class="">
                            <textarea v-model="postData.postComment" style="resize: none" class="form-control" name="comment" id="" cols="70" rows="4"
                                placeholder="write your comment here"></textarea>
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
    data() {
        return {
            postData: {
                postMedia: '',
                postComment: ''
            }
        }
    },
    mounted() {
    },
    methods: {
        browseFile() {
            let fileUpload = this.$refs.fileUpload;
            fileUpload.click();
        },
        showImage() {
            let file = this.$refs.fileUpload;
            let image = this.$refs.postImage;
            image.style.background = `url(${URL.createObjectURL(file.files[0])})`;
        },
        async submitForm(event) {
            // this.dispatch('addPost', )
            event.preventDefault();
            let file = this.$refs.fileUpload;
            let result;

            if( file.files && file.files[0] ){
                let formData = new FormData();
                formData.append('file', file.files[0]);
                result = await this.$store.dispatch('uploadImage', formData);
                console.log('result1: ', result)
            }

            await this.$store.dispatch('addPost', {
                "media": (result) ? result.url : '',
                "comment": this.postData.postComment
            })
            await this.$store.dispatch('getPosts');
        }
    }
}
</script>
<style scoped>
.post-image {
    background-position: center !important;
    background-size: cover !important;
}
</style>