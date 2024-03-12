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
                <LoginComp />
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center">
                <PhoneDesignComp />
            </div>
        </div>
    </main>
</template>

<script>
import PhoneDesignComp from '@/components/PhoneDesignComp.vue';
import LoginComp from '@/components/LoginComp.vue';

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
        
    },
    components: {
        PhoneDesignComp,
        LoginComp
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


</style>
