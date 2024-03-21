<template>
    <div class="main d-flex flex-column">
        <NavComp />
        <router-view/>
    </div>
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

:root {
    --dark: rgb(75,0,129);
    --dark-subtle: rgb(151,107,182);
}


body {
    /* background: linear-gradient(var(--dark) -70%, white 100%); */
}
.main {
    background: linear-gradient(var(--dark) -70%, white 100%);
}

.app-bg-primary {
    background-color: var(--primary);
}
.app-bg-white {
    background-color: white !important;
}

.app-btn-dark {
    background-color: var(--dark) !important;
    color: white !important;
}
.app-btn-outline-dark {
    background-color: transparent !important;
    color: rgba(0,0,0,0.4) !important;
    border-color: var(--dark);
}
.app-nav-btn {
    border-radius: 0px !important;
}

* {
    font-family: 'Inter', Arial, Helvetica, sans-serif;
}

</style>
