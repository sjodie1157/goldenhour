<template>
    <nav class="navbar navbar-lg-expand" v-if="navigation">
        <div class="container-fluid">
            <router-link to="/login" class="m-0 p-0 btn border-0"><h5 class="fw-bold text-secondary m-0 py-3 text-white"><i class="bi bi-app m-2"></i>CapstoneBud</h5></router-link>
            <div class="d-flex justify-content-center">
                <div class="position-relative mx-1">
                    <div class="position-absolute start-50 top-100 p-1 rounded-circle translate-middle bg-white"></div>
                    <router-link to="/login" class="btn border-0 rounded-pill m-1 position-relative text-white d-flex">Home</router-link>
                </div>
                <div class="position-relative mx-1">
                    <div class="position-absolute start-50 top-100 p-0 rounded-circle translate-middle bg-white"></div>
                    <router-link to="/login" class="btn border-0 rounded-pill m-1 position-relative text-white d-flex">About</router-link>
                </div>
                <div class="position-relative mx-1">
                    <div class="position-absolute start-50 top-100 p-0 rounded-circle translate-middle bg-white"></div>
                    <router-link to="/login" class="btn border-0 rounded-pill m-1 position-relative text-white d-flex">Contact</router-link>
                </div>
            </div>
            <div>
                <router-link to="/login" class="btn bg-white shadow rounded-pill m-1 text-secondary">Login</router-link>
                <router-link to="/login" class="btn rounded-pill m-1 text-white">Register</router-link>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: "NavComp",
    computed: {
        navigation(){
            return this.$store.state.display_nav;
        }
    }
}
</script>
<style scoped>

</style>