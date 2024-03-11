<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" v-if="navigation">
        <div class="container">
            <a href="#" class="navbar-brand fw-bolder text-secondary">
                CAPSTONE<span class="text-danger">BUD</span>
            </a>
        </div>
    </nav>
    <div class="container-fluid bg-body-tertiary d-flex justify-content-end shadow" v-if="navigation">
        <button class="btn btn-dark rounded-0 px-2 py-1">Login</button>
        <button class="btn btn-dark rounded-0 px-2 py-1">Sign Up</button>
    </div>
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
<style scoped></style>