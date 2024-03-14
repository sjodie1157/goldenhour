import {
    createStore
} from 'vuex';
import sweet from 'sweetalert';

const API = "http://localhost:5000";
// const API = "https://capstonebud.onrender.com";

export default createStore({
    state: {
        user: null,
        display_nav: true,
        formState: true
    },
    getters: {},
    mutations: {
        setNavDisplay(state, value){
            state.display_nav = value;
        },
        setUser(state, value) {
            state.user = value;
        },
        setFormState(state, value) {
            state.formState = value;
        }
    },
    actions: {
        navbar(context, payload){
            context.commit('setNavDisplay', payload);
        },
        redirect(context, route){
            location.href = `${location.origin}/${route}`;
        },
        formState(context, state) {
            context.commit('setFormState', state)
        },
        // async signUpUser(context, payload){},
        async signInUser(context, payload){
            try {
                let result = await fetch(`${API}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })

                let reply = await result.json();
                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null,
                }
                console.log(reply)
                switch( true ){
                    case reply.status >= 400:
                        alertMsg.title = "Error"
                        alertMsg.text = "Invalid email or password"
                        alertMsg.icon = "error"
                        break;
                    default:
                        alertMsg.title = "Success"
                        alertMsg.text = "Login successful"
                        alertMsg.icon = "success"
                        break
                }
                sweet(alertMsg);
            } catch(e) {
                console.log(e);
                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null,
                    timer: 2000
                }
                sweet(alertMsg);
            }
        },
        async registerUser(context, payload) {
            try {
                let result = await fetch(`${API}/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })

                let reply = await result.json();
                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null,
                }
                console.log(reply)
                switch( true ){
                    case reply.status >= 300:
                        alertMsg.title = "Confirmation"
                        alertMsg.text = reply.msg,
                        alertMsg.icon = "info"
                        break;
                    case reply.status >= 400:
                        alertMsg.title = "Error"
                        alertMsg.text = reply.msg,
                        alertMsg.icon = "error"
                        break;
                    default:
                        alertMsg.title = "Success"
                        alertMsg.text = reply.msg,
                        alertMsg.icon = "success"
                        break
                }
                sweet(alertMsg);
            } catch(e) {
                console.log(e);
                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null,
                    timer: 2000
                }
                sweet(alertMsg);
            }
        },
        async getFeed(){}
    },
    modules: {}
})