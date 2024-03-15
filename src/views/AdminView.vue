<template>
    <div class="container-fluid vh-100" v-if="user">
        <div class="row" v-if="user.role == 'admin'">
            <div class="col-3 bg-body-tertiary vh-100 p-0 d-flex flex-column">
                <FeedSideNavComp v-if="user" :user='{
        username: user.username,
        email: user.email
    }' />
                <FeedNavComponent v-if="user.role == 'admin'" />
                <div class="p-3 d-flex justify-content-center">
                    <button
                        class="btn bg-secondary-subtle border-2 border-secondary-subtle p-1 fw-normal px-2 shadow fs-7">
                        <span><i class="bi bi-gear-fill ms-1"></i></span>
                        <small class="mx-2">Settings</small>
                    </button>
                </div>
            </div>
            <div class="col-9 bg-white px-3 vh-100 d-flex flex-column">
                <div class="bg-dark-subtle my-3 p-3 rounded-1 fw-bold fs-5 text-white border border-2 text-center">Admin
                    Panel</div>
                <div class="container mt-0 p-3 bg-dark-subtle rounded-3 overflow-auto border border-2 user-select-none">
                    <div class="row my-3 px-5">
                        <div class="col d-flex align-items-center justify-content-start">
                            <h5 class="text-white fs-4 m-0">User Accounts</h5>
                        </div>
                        <div class="col d-flex align-items-center justify-content-center">
                            <div class="input-group">
                                <input ref="searchInput" class="form-control shadow-none border-0"
                                    placeholder="search for user">
                                <span class="pointer input-group-text border-0" @click="searchUser"
                                    @mouseenter="searchEnter" @mouseLeave="searchLeave">
                                    <i class="bi bi-search user-select-none"></i>
                                </span>
                            </div>
                        </div>
                        <div class="col d-flex align-items-center justify-content-end">
                            <button
                                class="btn bg-secondary-subtle border-2 border-secondary-subtle p-1 fw-normal px-2 shadow fs-7">
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
                                <td class="align-middle"><small>{{ user.userProfile }}</small></td>
                                <td class="d-flex flex-column justify-content-center align-items-center">
                                    <button class="btn btn-danger my-1" data-bs-target="#userEdit"
                                        data-bs-toggle="modal" @click="manageUser(user)">Manage</button>
                                    <!-- <button class="btn btn-dark my-1 w-75">Suspend</button> -->
                                    <!-- <button class="btn btn-dark my-1 w-75">Delete</button> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <AdminUserEdit :user='manageUserData'/>
</template>
<script>
import FeedNavComponent from '@/components/FeedNavComp.vue';
import FeedSideNavComp from '@/components/FeedSideNavComp.vue';
import AdminUserEdit from '@/components/AdminUserEdit.vue';

export default {
    name: "AdminView",
    data(){
        return {
            manageUserData: {}
        }
    },
    components: {
        FeedNavComponent,
        FeedSideNavComp,
        AdminUserEdit
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
        manageUser(user){
            this.manageUserData = user;
        },
        searchEnter() { },
        searchLeave() { }
    }
}
</script>
<style scoped></style>