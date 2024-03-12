<template>
    <main class="flex-fill container-fluid">
        <div class="row h-100">
            <div class="col-lg-6 d-flex flex-column justify-content-evenly align-items-center">
                <div class="d-flex flex-column mt-4">
                    <h4 class="display-4 fw-bold position-relative text-white d-flex flex-column">
                        CapstoneBud
                        <span class="position-absolute bg-dark top-100 end-0 translate-middle-y description px-4">
                            The new Social Media.
                        </span>
                    </h4>
                </div>
                <div class="rounded-4 py-5">
                    <form ref="loginForm" class="bg-dark-subtle shadow p-4 rounded-3">
                        <h3 class="display-3 fs-3 fw-bold text-white text-center">Already a user?</h3>
                        <div class="form-group">
                            <div class="position-relative my-2">
                                <label for="email" class="badge bg-primary-subtle text-secondary m-1">email</label>
                                <input id="email" type="email" class="form-control shadow-none" placeholder="enter your email" required/>
                            </div>
                            <div class="position-relative my-2">
                                <label for="password" class="badge bg-primary-subtle text-secondary m-1">password</label>
                                <input id="password" type="password" class="form-control shadow-none" placeholder="enter your password" required/>
                            </div>
                            <div class="w-100 d-flex justify-content-center mt-2">
                                <router-link to="" class="forgot-password text-decoration-none">Forgot password</router-link>
                            </div>
                            <div class="error-msg mt-3 d-flex justify-content-center align-items-center">
                                <i class="bi bi-exclamation text-danger fs-3"></i>
                                <div class="py-1 px-2 bg-danger rounded-3">
                                    <small class="text-white">Account does not exist</small>
                                </div>
                                <i class="bi bi-exclamation text-danger fs-3"></i>
                            </div>
                            <div class="w-100 d-flex justify-content-center">
                                <button id="login" class="px-2 py-1 mt-3 btn border-0 text-white">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center">
                <PhoneDesignComp />
            </div>
        </div>
    </main>
</template>

<script>
import PhoneDesignComp from '@/components/PhoneDesignComp.vue';

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
    mounted(){
        this.$refs.loginForm.onclick = (e) => {
            e.preventDefault();
        }
    },
    components: {
        PhoneDesignComp
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

.description {
    font-size: small !important;
}
.form-floating {
    &:focus {}
}
.form-control {
    font-size: small;
}
#login {
    background-color: var(--dark-subtle);
}
.forgot-password {
    font-size: small;
}
.error-msg {
    font-size: small;
}

</style>
