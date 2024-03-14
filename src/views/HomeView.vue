<template>
    <main class="flex-fill container-fluid px-4">
        <div class="row h-100">
            <div class="col-lg-6 d-flex flex-column justify-content-top align-items-center">
                <div class="d-flex flex-column mt-4">
                    <h4 class="display-4 fw-bold position-relative text-white d-flex flex-column">
                        CapstoneBud
                        <span class="position-absolute bg-dark top-100 end-0 translate-middle-y description px-4">
                            The new Social Media.
                        </span>
                    </h4>
                </div>
                <RegisterComp v-if="formState" />
                <LoginComp v-else />
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
import RegisterComp from '@/components/RegisterComp.vue';

export default {
    name: 'HomeView',
    data() {
    },
    mounted(){

    },
    components: {
        PhoneDesignComp,
        LoginComp,
        RegisterComp
    },
    methods: {
    },
    computed: {
        formState(){
            return this.$store.state.formState;
        }
    }
}
</script>
<style scoped>

.description {
    font-size: small !important;
}


</style>
