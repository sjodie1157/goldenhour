<template>
    <main class="vh-100 flex-fill container-fluid" @load="alertConcern">
        <div class="row flex-column-reverse flex-lg-row">
            <div ref="userForm" class="col-sm-12 col-lg-6 d-flex flex-column justify-content-top align-items-center">
                <div class="d-flex flex-column mt-4">
                    <h4 class="display-4 fw-bold position-relative text-white d-none d-lg-flex flex-column">
                        CapstoneBud
                        <span class="position-absolute bg-dark top-100 end-0 translate-middle-y description px-4">
                            The new Social Media.
                        </span>
                    </h4>
                </div>
                <RegisterComp v-if="formState" />
                <LoginComp v-else />
            </div>
            <div class="col-sm-12 col-lg-6 d-flex flex-column justify-content-center">
                <div class="d-flex flex-column align-items-center">
                    <h4 class="display-4 fw-bold position-relative text-white d-lg-none d-flex flex-column">
                        CapstoneBud
                        <span class="position-absolute bg-dark top-100 end-0 translate-middle-y description px-4">
                            The new Social Media.
                        </span>
                    </h4>
                </div>
                <PhoneDesignComp />
            </div>
        </div>
    </main>
</template>

<script>
import PhoneDesignComp from '@/components/PhoneDesignComp.vue';
import LoginComp from '@/components/LoginComp.vue';
import RegisterComp from '@/components/RegisterComp.vue';

import { useCookies } from 'vue3-cookies';

const {cookies} = useCookies();

export default {
    name: 'HomeView',
    data() {
    },
    mounted(){
        this.alertConcern();
        this.checkLogin();
    },
    components: {
        PhoneDesignComp,
        LoginComp,
        RegisterComp
    },
    methods: {
        alertConcern(){
            let msg = cookies.get('alertMsg');
            console.log(msg)
            if( msg ){
                this.$store.dispatch('sweetAlert', msg );
            }
        },
        checkLogin() {
            let user = cookies.get('authToken');
            if(user){
                this.$store.dispatch('redirect', 'feed');
            }
        }
    },
    computed: {
        users() {
            return this.$store.state.user;
        },
        alertMsg(){
            return this.$store.state.alertMsg;
        },
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
