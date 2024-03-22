<template>
    <div class="container-fluid vh-100" v-if="user">
        <div class="row" v-if="user.role == 'admin'">
            <div class="d-none col-3 bg-body-tertiary vh-100 p-0 d-lg-flex flex-column">
                <FeedSideNavComp v-if="user" :user='{
        username: user.username,
        email: user.email
    }' />
                <FeedNavComponent v-if="user.role == 'admin'" />
            </div>
            <div class="col-lg-9 col-md-12 bg-white px-3 vh-100 d-flex flex-column">
                <div class="bg-dark-subtle my-3 p-3 rounded-1 fw-bold fs-5 text-white border border-2 text-center d-flex justify-content-between align-items-center">
                    <span >Admin Panel</span>
                    <button class="btn app-btn-dark opacity-75 border-0 ms-2 d-block d-lg-none"
                        data-bs-target="#adminSideNav" data-bs-toggle="offcanvas" aria-controls="offcanvasScrolling">
                        <i class="bi bi-three-dots"></i>
                    </button>
                </div>
                <div
                    class="container-fluid mt-0 p-3 bg-dark-subtle rounded-3 overflow-auto border border-2 user-select-none">
                    <div class="row my-3 px-lg-5">
                        <div class="col-lg col-sm-12 my-2 my-lg-0 d-flex align-items-center justify-content-lg-start justify-content-center">
                            <h5 class="text-white fs-4 m-0">User Accounts</h5>
                        </div>
                        <div class="col-lg col-sm-12 d-flex align-items-center justify-content-center">
                            <div class="input-group">
                                <input ref="searchInput" class="form-control shadow-none border-0"
                                    placeholder="search for user">
                                <span class="pointer input-group-text border-0" @click="searchUser"
                                    @mouseenter="searchEnter" @mouseLeave="searchLeave">
                                    <i class="bi bi-search user-select-none"></i>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg col-sm-12 my-2 my-md-2 my-sm-0 d-flex align-items-center justify-content-sm-end justify-content-lg-center">
                            <button
                                class="btn bg-secondary-subtle border-2 border-secondary-subtle p-1 fw-normal px-2 shadow fs-7"
                                data-bs-target="#userAdd" data-bs-toggle="modal">
                                <span><i class="bi bi-person-fill-add"></i></span>
                                <small class="mx-2">Add User</small>
                            </button>
                        </div>
                    </div>
                    <table class="table table-borderless table-hover table-responsive user-select-none">
                        <thead>
                            <tr>
                                <th scope="col" class="text-secondary fw-light text-center">ID</th>
                                <th scope="col" class="text-secondary fw-light text-center">Name</th>
                                <th scope="col" class="text-secondary fw-light text-center">Role</th>
                                <th scope="col" class="text-secondary fw-light text-center">Email</th>
                                <th scope="col" class="text-secondary fw-light text-center">Profile</th>
                                <th scope="col" class="text-secondary fw-light text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="users">
                            <tr class="text-secondary text-center fw-light" v-for="user in users" :key="user">
                                <td class="align-middle"><small>{{ user.userID }}</small></td>
                                <td class="align-middle"><small>{{ user.userName }}</small></td>
                                <td class="align-middle"><small>{{ user.userRole }}</small></td>
                                <td class="align-middle"><small>{{ user.userEmail }}</small></td>
                                <td class="align-middle"><small><a :href="user.userProfile" target="_blank" class="text-truncate">{{ user.userProfile }}</a></small></td>
                                <td class="d-flex flex-column justify-content-center align-items-center">
                                    <button class="btn btn-danger my-1" data-bs-target="#userEdit"
                                        data-bs-toggle="modal" @click="manageUser(user)">Manage</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="offcanvas offcanvas-start" id="adminSideNav" data-bs-scroll="true" data-bs-backdrop="false">
        <div class="bg-body-tertiary vh-100 p-0 d-lg-flex flex-column">
            <FeedSideNavComp v-if="user" :user='{
        username: user.username,
        email: user.email
    }' />
            <FeedNavComponent v-if="user.role == 'admin'" />
        </div>
    </div>
    <AdminUserEdit :userID='userID' />
    <AdminAddUser />
    <SettingsModal />
</template>
<script>
import FeedNavComponent from '@/components/FeedNavComp.vue';
import FeedSideNavComp from '@/components/FeedSideNavComp.vue';
import AdminUserEdit from '@/components/AdminUserEdit.vue';
import AdminAddUser from '@/components/AdminAddUser.vue';
import SettingsModal from '@/components/SettingsModal.vue';

export default {
    name: "AdminView",
    data() {
        return {
            userID: null
        }
    },
    components: {
        FeedNavComponent,
        FeedSideNavComp,
        AdminUserEdit,
        AdminAddUser,
        SettingsModal
    },
    mounted() {
        this.$store.state.display_nav = false;
        this.$store.dispatch('loadUser');
        this.$store.dispatch('adminGetUsers');
    },
    computed: {
        user() {
            let user = this.$store.state.user;
            if (user) {
                if (user.role != 'admin') this.$store.dispatch('redirect', 'feed');
            }
            return user;
        },
        posts() {
            return this.$store.state.posts;
        },
        users() {
            return this.$store.state.users;
        }
    },
    methods: {
        searchUser() {
            let searchInput = this.$refs.searchInput;
            this.$store.dispatch('adminSearchUser', searchInput.value);
        },
        manageUser(user) {
            this.userID = user.userID;
        },
        searchEnter() { },
        searchLeave() { }
    }
}
</script>
<style scoped></style>