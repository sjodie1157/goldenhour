<template>
    <div class="modal fade" id="userProfile">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content overflow-hidden">
                <div v-if="user">
                    <div class="profile p-5" :style="{
                        'background': `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('${user.userProfile}')`
                    }">
                        <div class="p-5">
                            <div class="p-5"></div>
                        </div>
                    </div>
                    <div class="row p-4 g-0">
                        <div class="col d-flex justify-content-center">
                            <span class="display-5 fs-6 fw-medium text-secondary">Username:&nbsp;</span>
                            <span class="display-5 fs-6 fw-medium">{{user.userName}}</span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="profile p-5" :style="{
                        'background': `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3))`
                    }">
                        <div class="p-5">
                            <div class="p-5"></div>
                        </div>
                    </div>
                    <div class="row p-4 g-0">
                        <div class="col d-flex justify-content-center">
                            <span class="display-5 fs-6 fw-medium text-secondary">Username:&nbsp;</span>
                            <span class="display-5 fs-6 fw-medium"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        user(){
            return this.$store.state.currentUserProfile;
        }
    }
}
</script>

<style scoped>
.profile {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>