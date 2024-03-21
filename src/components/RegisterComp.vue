<template>
    <div class="flex-fill d-flex align-items-center overflow-hidden p-4">
        <form class="form bg-dark-subtle shadow p-4 rounded-3 my-lg-0 my-5">
            <h3 class="display-3 fs-3 fw-bold text-white text-center">Sign Up</h3>
            <div class="form-group">
                <div class="d-flex flex-column flex-md-row">
                    <div class="position-relative my-0 my-md-2 mx-2">
                        <label for="username" class="badge bg-primary-subtle text-secondary m-1">username</label>
                        <div class="input-group mb-3">
                            <input v-model="payload.username" class="form-control shadow-none border-0" type="username"
                                placeholder="username" aria-describedby="pass-view">
                            <span class="input-group-text border-0" id="pass-view"><i class="bi bi-person-circle"></i></span>
                        </div>
                    </div>
                    <div class="position-relative my-0 my-md-2 mx-2">
                        <label for="email" class="badge bg-primary-subtle text-secondary m-1">email</label>
                        <div class="input-group mb-3">
                            <input v-model="payload.email" class="form-control shadow-none border-0" type="email"
                                placeholder="email" aria-describedby="pass-view">
                            <span class="input-group-text border-0" id="pass-view"><i class="bi bi-envelope-at"></i></span>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column flex-md-row">
                    <div class="position-relative my-0 my-md-2 mx-2">
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
                    <div class="position-relative my-0 my-md-2 mx-2">
                        <label for="password" class="badge bg-primary-subtle text-secondary m-1">confirm password</label>
                        <div class="input-group mb-3">
                            <input ref="confirmPassword" v-model="payload.confirmPassword" class="form-control shadow-none border-0" type="password"
                                placeholder="password" aria-describedby="pass-view">
                            <span class="pointer input-group-text border-0" id="pass-view" @click="togglePasswordView">
                                <i v-if="showPassword" class="bi bi-eye-slash-fill"></i>
                                <i v-else class="bi bi-eye-fill"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="w-100 d-flex justify-content-center mt-2">
                    <div class="d-flex align-items-center">
                        <input v-if="ageAppropriate" type="checkbox" checked="checked" class="mx-2 my-2" @click="togglecheckbox">
                        <input v-else type="checkbox" class="mx-2 my-2" @click="togglecheckbox">
                        <small class="text-secondary">By clicking this you are confirming that you are, or older than 13.</small>
                    </div>
                </div>
                <div class="w-100 d-flex justify-content-center">
                    <button id="register" @click="submitForm" class="px-2 py-1 mt-3 btn border-0 text-white">
                        <LoaderComp v-if="signupBtnLoading" />
                        <span v-else>Sign Up</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import LoaderComp from '@/components/LoaderComp.vue';


export default {
    name: "RegisterComp",
    data() {
        return {
            payload: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                age: 0,
                profile: null
            },
            signupBtnLoading: false,
            showPassword: false,
            ageAppropriate: false
        }
    },
    components: {
        LoaderComp
    },
    mounted() {
    },
    methods: {
        async submitForm(event){
            event.preventDefault();

            event.target.setAttribute('disabled', '');

            this.signupBtnLoading = true;
            await this.$store.dispatch('registerUser', this.payload);
            this.signupBtnLoading = false;

            event.target.removeAttribute('disabled');
        },
        togglePasswordView() {
            let password = this.$refs.password;
            let confirmPassword = this.$refs.confirmPassword;

            this.showPassword = this.showPassword ? false : true;
            
            if( this.showPassword ){
                password.setAttribute('type', 'text');
                confirmPassword.setAttribute('type', 'text');
            } else {
                password.setAttribute('type', 'password');
                confirmPassword.setAttribute('type', 'password');
            }
        },
        togglecheckbox() {
            this.ageAppropriate = this.ageAppropriate ? false : true;
        }
    }
}
</script>
<style scoped>
.form-floating {
    &:focus {}
}

.form-control {
    font-size: small;
}

#register {
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