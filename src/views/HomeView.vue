<template>
    <div class="home">
        <form class="register m-3">
            <input v-model="registerForm.username" class="d-block mx-auto my-1" type="text" placeholder="username" required>
            <input v-model="registerForm.email" class="d-block mx-auto my-1" type="email" placeholder="email address" required>
            <input v-model="registerForm.password" class="d-block mx-auto my-1" type="password" placeholder="password" required>
            <input v-model="registerForm.confirmpassword" class="d-block mx-auto my-1" type="password" placeholder="confirm password" required>
            <input v-model="registerForm.age" class="d-block mx-auto my-1" type="number" placeholder="age" required>
            <button @click="register" type="button">Sign Up</button>
        </form>
        {{ user }}
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    data(){
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
        register(){
            this.$store.dispatch('signUpUser', this.registerForm);
        }
    },
    computed: {
        users(){
            return this.$store.state.user;
        }
    }
}
</script>
