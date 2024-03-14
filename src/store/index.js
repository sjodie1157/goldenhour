import {
    createStore
} from 'vuex';
import { method, sendRequest, getUserFromToken } from '@/service/UserAuth.js';
import sweet from 'sweetalert';
import { useCookies } from 'vue3-cookies';

const API = "http://localhost:5000";
// const API = "https://capstonebud.onrender.com";

const { cookies } = useCookies();

export default createStore({
    state: {
        user: null,
        display_nav: true,
        posts: null,
        alertMsg: null,
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
        setPosts(state, value) {
            state.posts = value
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
        sweetAlert(context, payload){
            sweet( payload );
            cookies.remove('alertMsg');
        },
        formState(context, state) {
            context.commit('setFormState', state)
        },
        // async signUpUser(context, payload){},
        async loadUser(context){
            context.commit('setUser', getUserFromToken());
        },
        async getPosts(context){
            try {
                console.log(context)
                
                let result = await sendRequest(`${API}/posts`, method.get);

                let data = await result.json();
                // console.log(data)
                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null
                }
                
                switch( true ){
                    case data.status >= 400:
                        alertMsg.title = "Error"
                        alertMsg.text = data.msg
                        alertMsg.icon = "error"

                        // cookies.remove('authToken');
                        cookies.set( "alertMsg", JSON.stringify(alertMsg) );

                        this.dispatch('redirect', '');
                        break;
                    default:
                        context.commit('setPosts', data.result);
                        break;
                }
            } catch(e) {
                console.log('e: ', e);
                sweet({
                    title: "Error",
                    text: "some error",
                    icon: "warning"
                })
            }
        },
        async signInUser(context, payload){
            try {
                let result = await sendRequest(`${API}/login`, "POST", payload);

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

                        cookies.set('authToken', reply.token);
                        this.dispatch('redirect', 'feed');
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