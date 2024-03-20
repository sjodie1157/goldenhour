<template>
    <div class="modal fade" id="settingsModal" v-if="user">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3">
                <div class="row g-0">
                    <div class="col d-flex justify-content-between align-items-center">
                        <h4 class="display-4 fs-4">Account Settings</h4>
                        <button ref="logoutModal" class="btn-close border-0 shadow-none" data-bs-dismiss="modal"></button>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <div ref="profileImage" class="profile-image p-5 mt-3 bg-secondary rounded-4" :style="{
        'background-image': `url(${(user.profile) ? user.profile : ''})`
    }">
                        <div class="p-5">
                            <div class="p-5"><i class="bi bi-person-fill text-white fs-1"></i></div>
                        </div>
                    </div>
                    <div v-if="!postUserProfile || postUserProfile.userID == user.id">
                        <form class="d-flex flex-column align-items-center">
                            <div class="d-flex">
                                <button @click="deleteImage" class="btn btn-danger m-2">
                                    <i class="bi bi-trash mx-1"></i>Delete
                                </button>
                                <button class="btn btn-secondary m-2" @click="browseFile">
                                    <i class="bi bi-upload mx-1"></i>Upload
                                </button>
                            </div>
                            <input ref="fileUpload" type="file" @change="showImage" class="d-none" />
                        </form>
                    </div>  
                    <div class="d-flex">
                        <table class="table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr class="py-3">
                                    <td class="align-middle"><span>User Name: </span></td>
                                    <td class="px-4"><input class="form-control shadow-none fw-medium" v-model="user.username" type="text" placeholder="Edit your username" style="font-size: medium;"></td>
                                </tr>
                                <tr>
                                    <td><span>User Email: </span></td>
                                    <td class="px-4"><span>{{ user.email }}</span></td>
                                </tr>
                                <tr class="py-3">
                                    <td><span>Activity: </span></td>
                                    <td class="px-4"><span class="text-success">Online</span></td>
                                </tr>
                                <tr class="py-3">
                                    <td><span>Account Created: </span></td>
                                    <td class="px-4"><span>{{ user.accountCreated }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex flex-column">
                        <button class="btn btn-secondary m-1" @click="save">
                            <i class="bi bi-download mx-1"></i>Save
                        </button>
                        <button class="btn btn-danger mx-1" @click="logout">
                            <i class="bi bi-box-arrow-left me-1"></i>Logout
                        </button>
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
        logout() {
            let modal = this.$refs.logoutModal;
            modal.click();
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
        deleteImage(event) {
            event.preventDefault();
        },
        async save(){
            let file = this.$refs.fileUpload;
            let result;

            if (file.files && file.files[0]) {
                let formData = new FormData();
                formData.append('file', file.files[0]);
                result = await this.$store.dispatch('uploadImage', formData);
                console.log('result1: ', result)
            }

            
            this.user.profile = (result) ? result.url : this.user.profile;

            console.log("user:", this.user)
            let payload = {
                userID: this.user.id,
                userName: this.user.username,
                userProfile: (result) ? result.url : this.user.profile
            }

            await this.$store.dispatch('updateUser', payload);
            await this.$store.dispatch('loadUser');
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>
<style scoped>
.profileImage {
    background-position: center;
    background-size: cover;
}
</style>