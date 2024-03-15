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
                {{user}}
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <div class="profile-image p-5 mt-3 bg-secondary rounded-4" :style="{
                        'background-image': `url(${ (user.profile) ? user.profile : '' })`
                    }">
                        <div class="p-5">
                            <div class="p-5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SettingsModal",
    computed: {
        user(){
            return this.$store.state.user;
        }
    }
}
</script>