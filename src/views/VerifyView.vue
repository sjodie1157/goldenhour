<template>
    <div>Account Verified</div>
</template>
<script>
export default {
    name: "VerifyView",
    data(){
        return {
            params: null
        }
    },
    async mounted(){
        this.params = this.$route.query;
        this.$store.dispatch('navbar', false);
        if( this.params.token ){
            await this.$store.dispatch('verify', this.params.token);
        } else {
            this.$store.dispatch('redirect', '');
        }
        
        let user = this.$store.state.user;

        console.log(user);

        if( !user.token ){
            this.$cookies.remove('token');
            this.$store.dispatch('redirect', '');
        } else {
            this.$cookies.set('token', user.token);
            this.$store.dispatch('redirect', 'feed');
        }
    },
    unmounted() {
        this.$store.dispatch('navbar', true);
    },
    computed: {
    }
}
</script>