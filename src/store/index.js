import {
    createStore
} from 'vuex';
import { method, sendRequest, getUserFromToken } from '@/service/UserAuth.js';
import sweet from 'sweetalert';
import { useCookies } from 'vue3-cookies';

// const API = "http://localhost:5000";
const API = "https://capstonebud.onrender.com";

const { cookies } = useCookies();

export default createStore({
    state: {
        user: null,
        display_nav: true,
        posts: null,
        alertMsg: null,
        formState: true,
        isAdmin: false,
        users: null,
        currentEditPost: null,
        currentUserPost: null,
        postComments: null
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
        },
        setAdmin(state, value){
            state.isAdmin = value;
        },
        setUsers(state, value){
            state.users = value;
        },
        setEditPost(state, value){
            state.currentEditPost = value;
        },
        setPostComments(state, value){
            state.postComments = value;
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
        setCurrentEditPost(context, payload){
            context.commit('setEditPost', payload);
        },
        logoutUser(){
            cookies.remove('authToken');

            this.dispatch('redirect', '')
        },
        async loadUser(context){
            let user = getUserFromToken();

            let result = await sendRequest(`${API}/user/profile/me`, "GET");
            let reply = await result.json();

            user = reply.result;

            console.log('user profile: ',user)
            if(user){
                if( user.role == 'admin' ) context.commit('setAdmin', true);
                context.commit('setUser', user);
            } else {
                this.dispatch('redirect', '')
            }
        },
        async updatePosts(){
            try {
                if( this.state.posts ){
                    let postCount = this.state.posts.length;
                    let result = await sendRequest(`${API}/posts/updateposts/${postCount}`, "GET");
                    let reply = await result.json();
    
                    if( reply.result && reply.result.length != postCount ){
                        this.dispatch('getPosts');
                    }
                }
            } catch(e) {
                console.log(e)
            }
        },
        async getPosts(context){
            try {
                let result = await sendRequest(`${API}/posts`, method.get);

                let data = await result.json();

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
        async updateUser(context, payload){
            try {
                console.log('payload: ', payload);
                let result = await sendRequest(`${API}/user/${payload.id}`, "PATCH", payload);
                let reply = await result.json();

                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null
                }

                let {new_token} = reply;

                cookies.set('authToken', new_token);

                switch( true ){
                    case reply.status >= 400:
                        alertMsg.title = "Error";
                        alertMsg.text = reply.msg;
                        alertMsg.icon = "error";
                        sweet(alertMsg)
                        break;
                        default:
                            alertMsg.title = "Updated Successfully";
                            alertMsg.text = reply.msg;
                            alertMsg.icon = "success";
                        sweet(alertMsg);
                        break;
                }
                
            } catch(e) {
                console.log(e);
            }
        },
        async getFeed(){},
        async adminGetUsers(context){
            try {
                let result = await sendRequest(`${API}/users`);

                let reply = await result.json();
                context.commit('setUsers', reply.result);
            } catch(e) {
                console.log(e);
            }
        },
        async adminSearchUser(context, user){
            try {
                if(user != '') {
                    let result = await sendRequest(`${API}/users/search/${user}`, "GET");
                    let reply = await result.json();
                    context.commit( 'setUsers', reply.result );
                } else {
                    this.dispatch('adminGetUsers');
                }
            } catch(e) {
                console.log(e);
            }
        },
        async uploadImage(context, data){
            try {
                console.log(data)
                // let result = await sendRequest(`${API}/post/upload`, "POST", data, {
                //     "Content-Type": "multipart/form-data"
                // });
                let result = await fetch(`${API}/post/upload`, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1yQnVkIiwiZW1haWwiOiJjYXBzdG9uZWJ1ZEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJhZ2UiOjI1LCJpYXQiOjE3MTA1MDI0ODMsImV4cCI6MTcxMTEwNzI4M30.4pDcECb-W-eC9l6qqfiT27SH_yaZ4JXxtyWBs32OKa0"
                    },
                    body: data
                })
                console.log("result: ", result)

                let response = await result.json()
                return response.result;
            } catch(e) {
                console.log(e);
            }
        },
        async addPost(context, payload){
            try {
                let result = await sendRequest(`${API}/posts`, "POST", payload);
                let reply = await result.json();
                console.log('reply: ', reply)

                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null
                }

                switch( true ){
                    case reply.status >= 400:
                        alertMsg.title = 'Error';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'error';

                        sweet(alertMsg);
                        break;
                    default:
                        alertMsg.title = 'Posted';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'success';

                        sweet(alertMsg)
                        break;
                }
            } catch(e) {
                console.log(e)
            }
        },
        async deletePost(context, postID){
            try {
                console.log(`${API}/post/${postID}`)
                let result = await sendRequest(`${API}/post/${postID}`, "DELETE")
                console.log('reply: ', result)
                let reply = await result.json();

                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null
                }

                switch( true ){
                    case reply.status >= 400:
                        alertMsg.title = 'Error';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'error';

                        sweet(alertMsg);
                        break;
                    default:
                        alertMsg.title = 'Post Deleted';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'success';

                        await this.dispatch('getPosts');
                        sweet(alertMsg)
                        break;
                }
            } catch(e) {
                console.log(e);
            }
        },
        async editPost(context, payload){
            try {
                let postID = payload.postID;
                let result = await sendRequest(`${API}/post/${postID}`, "PUT", payload);

                let reply = await result.json();

                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null
                }

                switch( true ){
                    case reply.status >= 400:
                        alertMsg.title = 'Error';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'error';

                        sweet(alertMsg);
                        break;
                    default:
                        alertMsg.title = 'Post Edited';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'success';

                        await this.dispatch('getPosts');
                        sweet(alertMsg)
                        break;
                }
            } catch(e) {
                console.log(e)
            }
        },
        async getPostComments(context, postID){
            try {
                let result = await sendRequest(`${API}/post/${postID}/comments`, "GET");
                let reply = await result.json();

                console.log('comments reply: ', reply)

                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null
                }

                switch( true ){
                    case reply.status >= 400:
                        alertMsg.title = 'Error';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'error';

                        sweet(alertMsg);
                        break;
                    default:
                        alertMsg.title = 'Post Edited';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'success';

                        context.commit('setPostComments', reply.result);
                        context.commit('setCurrentUserPost', reply)
                        break;
                }
            } catch(e) {
                console.log(e)
            }
        },
        async addPostComment(context, payload){
            try {
                let result = await sendRequest(`${API}/post/comment`, "POST", payload);
                let reply = await result.json();

                console.log(reply);

                let alertMsg = {
                    title: null,
                    text: null,
                    icon: null
                }

                switch( true ){
                    case reply.status >= 400:
                        alertMsg.title = 'Error';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'error';

                        sweet(alertMsg);
                        break;
                    default:
                        alertMsg.title = 'Added Comment';
                        alertMsg.text = reply.msg;
                        alertMsg.icon = 'success';
                        sweet(alertMsg)
                        break;
                }
            } catch(e) {
                console.log(e)
            }
        },
        async deletePostComment(context, payload){
            try {
                // http://localhost:5000/post/3/comment/2
                let result = await sendRequest(`${API}/post/${payload.postID}/comment/${payload.commentID}`, "DELETE");
                let reply = await result.json();

                console.log('some: ', reply)
            } catch(e) {
                console.log(e)
            }
        },
        async editPostComment(context, payload) {
            try {
                // http://localhost:5000/post/3/comment/1
                let result = await sendRequest(`${API}/post/${payload.postID}/comment/${payload.commentID}`, "PUT", payload);
                let reply = await result.json();

                console.log(reply)
            } catch(e) {
                console.log(e)
            }
        }
    },
    modules: {}
})