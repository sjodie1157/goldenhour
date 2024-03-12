import {
    createStore
} from 'vuex';

const API = "http://localhost:5000";
// const API = "https://capstonebud.onrender.com";

export default createStore({
    state: {
        user: null,
        display_nav: true
    },
    getters: {},
    mutations: {
        setNavDisplay(state, value){
            state.display_nav = value;
        },
        setUser(state, value) {
            state.user = value;
        }
    },
    actions: {
        navbar(context, payload){
            context.commit('setNavDisplay', payload);
        },
        redirect(context, route){
            location.href = `${location.origin}/${route}`;
        },
        async signUpUser(context, payload){
            try {
                let result = await fetch(`${API}/account/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })

                console.log(await result.json());
            } catch(e) {
                console.log(e);
            }
        },
        async verify(context, token){
            try {
                let result = await fetch(`${API}/account/verify`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({token})
                })
                let data = await result.json();
                context.commit('setUser', data);
            } catch(e) {
                console.log(e)
            }
        }
    },
    modules: {}
})