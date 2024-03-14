import {
    createStore
} from 'vuex';
import { method, sendRequest, getUserFromToken } from '@/service/UserAuth.js';
import sweet from 'sweetalert';
import { useCookies } from 'vue3-cookies';

// const API = "http://localhost:4500";
const API = "https://capstonebud.onrender.com";

const { cookies } = useCookies();

export default createStore({
    state: {
        user: null,
        display_nav: true,
        posts: null,
        alertMsg: null
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
                let result = await fetch(`${API}/login`, {
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
        // async verify(context, token){}
    },
    modules: {}
})