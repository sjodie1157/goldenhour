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
                <div class="container mt-5 p-3 bg-dark-subtle rounded-3 overflow-auto">
                    <h5 class="text-white fs-4">User Accounts</h5>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" class="text-secondary fw-light text-center">ID</th>
                                <th scope="col" class="text-secondary fw-light text-center">Name</th>
                                <th scope="col" class="text-secondary fw-light text-center">Email</th>
                                <th scope="col" class="text-secondary fw-light text-center">Profile</th>
                                <th scope="col" class="text-secondary fw-light text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="users">
                            <tr class="text-secondary text-center fw-light" v-for="user in users" :key="user">
                                <td class="align-middle"><small>{{user.userID}}</small></td>
                                <td class="align-middle"><small>{{user.userName}}</small></td>
                                <td class="align-middle"><small>{{user.userEmail}}</small></td>
                                <td class="align-middle"><small>{{user.userProfile}}</small></td>
                                <td class="d-flex flex-column justify-content-center align-items-center">
                                    <button class="btn btn-dark my-1 w-75" data-bs-target="#userEdit" data-bs-toggle="modal">Edit</button>
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
    <div class="modal" id="userEdit">
        <div class="wider-modal modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">User Edit</div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FeedNavComponent from '@/components/FeedNavComp.vue';
import FeedSideNavComp from '@/components/FeedSideNavComp.vue';

export default {
    name: "AdminView",
    components: {
        FeedNavComponent,
        FeedSideNavComp
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
    }
}
</script>
<style scoped>
.wider-modal {
    width: 80% !important;
}
</style>