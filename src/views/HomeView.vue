<template>
    <main class="flex-fill container-fluid">
        <div class="row h-100">
            <div class="col-lg-6 d-flex justify-content-center align-items-start">
                <div class="d-flex flex-column mt-4">
                    <h4 class="display-4 fw-bold position-relative text-white d-flex flex-column">
                        CapstoneBud
                        <span class="position-absolute bg-dark top-100 end-0 translate-middle-y description px-4">
                            The new Social Media.
                        </span>
                    </h4>
                </div>
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center">
                <div class="row position-relative d-flex align-items-center">
                    <!-- asd -->
                    <div class="col-lg-4"></div>
                    <div class="position-relative col-lg-4 d-flex justify-content-center">
                        <img src="@/assets/Phone.svg" />
                    </div>
                    <div class="col-lg-4"></div>
                    <div class="row g-0 position-absolute overflow-hidden">
                        <div class="col-4 d-flex py-4 py-lg-4 justify-content-end px-3 p-lg-0">
                            <div class="p-image bg-danger shadow p-5 rounded-1" style="background-image: url(https://i.ibb.co/thMjDB8/vitaliy-shevchenko-f-MNP7-XVcct0-unsplash.jpg);">
                                <div class="p-5"></div>
                            </div>
                        </div>
                        <div class="col-4 d-flex py-4 justify-content-center px-2">
                            <div class="p-image bg-danger shadow p-5 rounded-1" style="background-image: url(https://i.ibb.co/B6XYQBd/alps-patel-Eb40v-RVVif-Q-unsplash.jpg);">
                                <div class="p-5"></div>
                            </div>
                        </div>
                        <div class="col-4 d-flex py-4 py-lg-4 justify-content-start px-3 p-lg-0">
                            <div class="p-image bg-danger shadow p-5 rounded-1" style="background-image: url(https://i.ibb.co/GMJLkRW/clarisse-meyer-Fn-Fs-Xj-vz0g-unsplash.jpg);">
                                <div class="p-5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'HomeView',
    data() {
        return {
            registerForm: {
                username: "",
                email: "",
                password: "",
                confirmpassword: "",
                age: 0,
            }
        }
    },
    components: {
    },
    methods: {
        register() {
            this.$store.dispatch('signUpUser', this.registerForm);
        }
    },
    computed: {
        users() {
            return this.$store.state.user;
        }
    }
}
</script>
<style scoped>
.phone {
    background-image: url(https://i.ibb.co/mz3Kz0d/Phone.png);
    background-position: center;
}

.p-image {
    background-position: center;
    background-size: cover;
}
.description {
    font-size: small !important;
}
</style>
