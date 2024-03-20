<template>
    <div class="modal modal-xl fade" id="userAdd">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3">
                <div class="row g-0">
                    <div class="col-6 d-flex align-items-center justify-content-center">
                        <h5 class="display-5 text-secondary fs-4 fw-medium text-center m-0">Add User</h5>
                    </div>
                    <div class="col-6 d-flex align-items-center justify-content-end">
                        <button type="button" class="btn-close border-0 shadow-none" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                </div>
                <div class="row g-0 pt-5">
                    <div class="col-6 d-flex justify-content-center">
                        <div>
                            <div class="bg-secondary p-5 rounded-3 position-relative">
                                <div class="p-5">
                                    <div class="p-5">
                                        <i
                                            class="profile bi bi-person-fill position-absolute top-50 start-50 translate-middle text-white"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 d-flex justify-content-center align-items-start flex-column px-5">
                        <table class="table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr class="py-3">
                                    <td class="align-middle"><span>Username: </span></td>
                                    <td class="px-4">
                                        <span>
                                            <input v-model="userData.username" class="form-control" type="text" placeholder="username">
                                        </span>
                                    </td>
                                </tr>
                                <tr class="py-3">
                                    <td class="align-middle"><span>User Email: </span></td>
                                    <td class="px-4">
                                        <span>
                                            <input v-model="userData.email" class="form-control" type="text" placeholder="email">
                                        </span>
                                    </td>
                                </tr>
                                <tr class="py-3">
                                    <td class="align-middle"><span>User Password: </span></td>
                                    <td class="px-4">
                                        <span>
                                            <input v-model="userData.password" class="form-control" type="text" placeholder="password">
                                        </span>
                                    </td>
                                </tr>
                                <tr class="py-3">
                                    <td class="align-middle"><span>User Role: </span></td>
                                    <td class="px-4">
                                        <div class="dropdown align-items-center">
                                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                {{ userData.role }}
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><button class="dropdown-item"
                                                        @click="changeUserRole('admin')">Admin</button></li>
                                                <li><button class="dropdown-item"
                                                        @click="changeUserRole('user')">User</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row g-0 pb-5">
                    <div class="col-6 d-flex justify-content-center">
                        <div>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-danger mx-1 my-2 pe-3">
                                    <i class="bi bi-trash me-1"></i>Delete</button>
                                <button class="btn btn-secondary mx-1 my-2 pe-3">
                                    <i class="bi bi-upload me-1"></i>Upload</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 d-flex justify-content-center align-items-center flex-column">
                        <div class="d-flex justify-content-evenly">
                            <button class="btn btn-secondary mx-2 pe-3" @click="addUser">
                                <i class="bi bi-save me-1"></i>Add User</button>
                            <button class="btn btn-primary mx-2 pe-3">
                                <i class="bi bi-envelope-fill me-1"></i>Mail User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "AdminUserEdit",
    data() {
        return {
            userData: {
                role: "None",
                age: 0
            }
        }
    },
    mounted() {
    },
    methods: {
        changeUserRole(role){
            this.userData.role = role
        },
        async addUser(){
            await this.$store.dispatch('registerUser', this.userData);
            await this.$store.dispatch('adminGetUsers');
        }
    }
}
</script>
<style scoped>
.profile {
    font-size: 600%;
}
</style>