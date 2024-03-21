<template>
    <div class="flex-fill d-flex align-items-center overflow-hidden">
        <form ref="loginForm" class="form bg-dark-subtle shadow p-4 rounded-3">
            <h3 class="display-3 fs-3 fw-bold text-white text-center">Already a user?</h3>
            <div class="form-group">
                <div class="position-relative my-2">
                    <label for="email" class="badge bg-primary-subtle text-secondary m-1">email</label>
                    <div class="input-group mb-3">
                        <input v-model="payload.email" class="form-control shadow-none border-0" type="email"
                            placeholder="email" aria-describedby="pass-view">
                        <span class="input-group-text border-0" id="pass-view"><i class="bi bi-envelope-at"></i></span>
                    </div>
                </div>
                <div class="position-relative my-2">
                    <label for="password" class="badge bg-primary-subtle text-secondary m-1">password</label>
                    <div class="input-group mb-3">
                        <input ref="password" v-model="payload.password" class="form-control shadow-none border-0" type="password"
                            placeholder="password" aria-describedby="pass-view">
                        <span class="pointer input-group-text border-0" id="pass-view" @click="togglePasswordView">
                            <i v-if="showPassword" class="bi bi-eye-slash-fill"></i>
                            <i v-else class="bi bi-eye-fill"></i>
                        </span>
                    </div>
                </div>
                <div class="w-100 d-flex justify-content-center mt-2">
                    <router-link to="" class="forgot-password text-decoration-none">Forgot password</router-link>
                </div>
                <div class="w-100 d-flex justify-content-center">
                    <button id="login" @click="submitForm" class="px-2 py-1 mt-3 btn border-0 text-white">Login</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: "LoginComp",
    data() {
        return {
            payload: {
                email: "",
                password: ""
            },
            showPassword: false
        }
    },
    mounted() {
        this.$refs.loginForm.onclick = (e) => {
            e.preventDefault();
        }
    },
    methods: {
        submitForm() {
            this.$store.dispatch('signInUser', this.payload);
        },
        togglePasswordView() {
            let input = this.$refs.password;
            this.showPassword = this.showPassword ? false : true;

            if( this.showPassword ){
                input.setAttribute('type', 'text');
            } else {
                input.setAttribute('type', 'password');
            }
        }
    }
}
</script>
<style scoped>
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

.pointer {
    cursor: pointer;
}

.form {
    animation-name: formFadeIn;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

@keyframes formFadeIn {
    0% {
        opacity: 0;
        transform: translateY(20%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
}

@keyframes formFadeOut {
    0% {
        opacity: 0;
        transform: translateY(0%);
    }
    100% {
        opacity: 1;
        transform: translateY(20%);
    }
}
</style>