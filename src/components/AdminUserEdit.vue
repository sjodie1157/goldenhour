<template>
    <div class="modal modal-xl fade" id="userEdit">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3">
                <div class="row g-0">
                    <div class="col-6 d-flex align-items-center justify-content-center">
                        <h5 class="display-5 text-secondary fs-4 fw-medium text-center m-0">Manage User</h5>
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
                                    <td><span>User ID: </span></td>
                                    <td class="px-4"><span>{{ user.userID }}</span></td>
                                </tr>
                                <tr class="py-3">
                                    <td><span>User Name: </span></td>
                                    <td class="px-4"><span>{{ user.userName }}</span></td>
                                </tr>
                                <tr>
                                    <td><span>User Email: </span></td>
                                    <td class="px-4"><span>{{ user.userEmail }}</span></td>
                                </tr>
                                <tr class="py-3">
                                    <td class="align-middle"><span>User Role: </span></td>
                                    <td class="px-4">
                                        <div class="dropdown align-items-center">
                                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                {{ user.userRole }}
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
                                <tr class="py-3">
                                    <td><span>Activity: </span></td>
                                    <td class="px-4"><span class="text-success">Online</span></td>
                                </tr>
                                <tr class="py-3">
                                    <td><span>Account Created: </span></td>
                                    <td class="px-4"><span>{{ user.userName }}</span></td>
                                </tr>
                                <tr class="py-3">
                                    <td class="align-middle"><span>Account Status: </span></td>
                                    <td class="px-4">
                                        <div class="dropdown align-items-center">
                                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                {{ user.userRole }}
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><button class="dropdown-item"
                                                        @click="changeUserRole('admin')">Activated</button></li>
                                                <li><button class="dropdown-item"
                                                        @click="changeUserRole('user')">Deactivated</button></li>
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
                            <button class="btn btn-secondary mx-2 pe-3">
                                <i class="bi bi-save me-1"></i>Save Changes</button>
                            <button class="btn btn-primary mx-2 pe-3">
                                <i class="bi bi-envelope-fill me-1"></i>Mail User</button>
                            <button class="btn btn-danger mx-2 pe-3">
                                <i class="bi bi-envelope-fill me-1"></i>Delete User</button>
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
    props: {
        user: Object
    },
    data() {
        return {
            userData: {}
        }
    },
    mounted() {
    },
    methods: {
        changeUserRole() {
            let user_update = this.user;
            console.log(user_update)
        },
        saveChanges() { }
    }
}
</script>
<style scoped>
.profile {
    font-size: 600%;
}
</style>