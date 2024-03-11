<template>
    <NavComp />
    <main>
        <router-view />
    </main>
    <FooterComp />
</template>

<script>
import NavComp from "@/components/NavComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
    name: 'App',
    components: {
        NavComp,
        FooterComp
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

* {
    font-family: 'Inter', Arial, Helvetica, sans-serif;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
