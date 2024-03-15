<template>
    <nav class="navbar navbar-lg-expand" v-if="navigation">
        <div class="container-fluid">
            <router-link to="/login" class="m-0 p-0 btn border-0"><h5 class="fw-bold text-secondary m-0 py-4 text-white">
                CapstoneBud</h5></router-link>
            <div class="d-flex justify-content-center">
                <div class="position-relative mx-1" @mouseenter="linkEnter" @mouseleave="linkLeave">
                    <div class="transition position-absolute start-50 top-100 rounded-circle translate-middle bg-white" :class="{ 'p-1' : currentRoute == 0 }"></div>
                    <router-link to="/" class="transition btn border-0 rounded-pill m-1 position-relative text-white d-flex" @click="changeRoute('home')" route-name="home">Home</router-link>
                </div>
                <div class="position-relative mx-1" @mouseenter="linkEnter" @mouseleave="linkLeave">
                    <div class="transition position-absolute start-50 top-100 p-0 rounded-circle translate-middle bg-white" :class="{ 'p-1' : currentRoute == 1 }"></div>
                    <router-link to="/about" class="transition btn border-0 rounded-pill m-1 position-relative text-white d-flex" @click="changeRoute('about')" route-name="about">About</router-link>
                </div>
                <div class="position-relative mx-1" @mouseenter="linkEnter" @mouseleave="linkLeave">
                    <div class="transition position-absolute start-50 top-100 p-0 rounded-circle translate-middle bg-white" :class="{ 'p-1' : currentRoute == 2 }"></div>
                    <router-link to="/contact" class="transition btn border-0 rounded-pill m-1 position-relative text-white d-flex" @click="changeRoute('contact')" route-name="contact">Contact</router-link>
                </div>
            </div>
            <div>
                <router-link to="/" :class="{ 'bg-white' : !formState, 'shadow': !formState, 'text-secondary': !formState, 'text-white': formState }" class="btn rounded-pill m-1 border-0" @click="loginBtn">Login</router-link>
                <router-link to="/" :class="{ 'bg-white' : formState, 'shadow': formState, 'text-secondary': formState, 'text-white': !formState }" class="btn rounded-pill m-1 border-0" @click="registerBtn">Register</router-link>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: "NavComp",
    data(){
        return {
            route: {
                "home": 0,
                "about": 1,
                "contact": 2
            },
            currentRoute: 0
        }
    },
    mounted(){
        this.changeRoute(this.$route.name);
    },
    computed: {
        navigation(){
            return this.$store.state.display_nav;
        },
        formState(){
            return this.$store.state.formState;
        }
    },
    methods: {
        linkEnter(event){
            let elem = event.target.children[0];
            let previousElem = elem.getAttribute('class');

            let link = event.target.children[1];
            let previousLink = link.getAttribute('class');

            link.setAttribute('previous-class', previousLink);
            link.setAttribute('class', 'transition btn border-0 rounded-pill m-1 position-relative text-secondary d-flex')

            elem.setAttribute('previous-class', previousElem);
            elem.setAttribute("class", "transition position-absolute start-50 top-50 p-5 bg-white rounded-circle translate-middle");
        },
        linkLeave(event){
            let elem = event.target.children[0];
            let previous = elem.getAttribute('previous-class');

            let link = event.target.children[1];
            let previousLink = link.getAttribute('previous-class');

            link.removeAttribute('previous-class');
            link.setAttribute('class', previousLink);

            console.log(this.route[link.getAttribute('route-name')] )

            let classArr = previous.split(' ');
            console.log(classArr);
            if( this.currentRoute == this.route[link.getAttribute('route-name')] ){
                classArr = classArr.filter((i)=>i!='p-0');
                classArr.push('p-1');
                console.log(1,classArr.join(' '))
            } else {
                classArr = classArr.filter((i)=>i!='p-1');
                classArr.push('p-0');
                console.log(2,classArr.join(' '))
            }

            elem.removeAttribute('previous-class');
            elem.setAttribute("class", classArr.join(' '));
        },
        changeRoute(pathname){
            console.log('path: ', pathname)
            if( pathname ){
                this.currentRoute = this.route[pathname];
                console.log('route: ', this.currentRoute)
            }
        },
        loginBtn() {
            this.$store.dispatch('formState', false);
        },
        registerBtn() {
            this.$store.dispatch('formState', true);
        }
    }
}
</script>
<style scoped>
.transition {
    transition: 400ms ease;
}
.logo {
    background-image: url('@/assets/logo.png');
    background-size: contain;
    background-position: center;
}
</style>