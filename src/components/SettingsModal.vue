<template>
    <div class="modal fade" id="settingsModal" v-if="user">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content p-3">
                <div class="row g-0">
                    <div class="col d-flex justify-content-between align-items-center">
                        <h4 class="display-4 fs-4">Account Settings</h4>
                        <button class="btn-close border-0 shadow-none" data-bs-dismiss="modal"></button>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <div ref="profileImage" class="profile-image p-5 mt-3 bg-secondary rounded-4" :style="{
                        'background-image': `url(${ (user.profile) ? user.profile : '' })`
                    }">
                        <div class="p-5">
                            <div class="p-5"></div>
                        </div>
                    </div>
                    <div v-if="!postUserProfile || postUserProfile.userID == user.id">
                        <form class="d-flex flex-column align-items-center">
                            <div class="d-flex">
                                <button>Delete</button>
                                <button @click="browseFile">Upload</button>
                            </div>
                            <input ref="fileUpload" type="file" @change="showImage"/>
                        </form>
                    </div>
                    {{user}}
                    <div>
                        <button @click="logout">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SettingsModal",
    props: {
        postUserProfile: Object
    },
    methods: {
        logout(){
            this.$store.dispatch('logoutUser');
        },
        browseFile(event) {
            event.preventDefault();

            let fileUpload = this.$refs.fileUpload;
            fileUpload.click();
        },
        showImage() {
            let file = this.$refs.fileUpload;
            let image = this.$refs.profileImage;
            image.style.background = `url(${URL.createObjectURL(file.files[0])})`;
        },
        async submitForm(event) {
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
    },
    computed: {
        user(){
            return this.$store.state.user;
        }
    }
}
</script>