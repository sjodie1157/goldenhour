<template>
    <div class="modal fade" id="commentsModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-0">
                <!-- {{post}} -->
                <div class="modal-header row g-0 px-3 pt-3">
                    <div class="col d-flex justify-content-between align-items-center">
                        <h4 class="display-4 fs-4 text-secondary">Comments</h4>
                        <button class="btn-close border-0 shadow-none" data-bs-dismiss="modal"></button>
                    </div>
                </div>
                <div class="modal-body">
                    <div v-if="post" class="media shadow rounded-3 overflow-hidden mb-4" :style='{
                        "background-image": `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${post.image})`
                    }'>
                        <!-- {{post}} -->
                        <div class="d-flex p-2 align-items-center justify-content-between">
                            <div class="self-contact d-flex justify-content-center rounded-4">
                                <div class="profile_picture position-relative m-1 bg-secondary shadow rounded-4 p-4"
                                    :style='{
                        "background-image": `url(${post.profile})`
                    }'><i class="bi bi-person-fill position-absolute fs-4 top-50 start-50 translate-middle text-white"
                                        v-if="!post.profile"></i></div>
                                <div class=" d-none d-lg-flex flex-column justify-content-evenly align-items-start">
                                    <div
                                        class="text-truncate d-flex flex-column justify-content-evenly align-items-start">
                                        <small class="username ms-2 me-3 text-white user-select-none">{{ post.username
                                            }}</small>
                                        <small class="datetime ms-2 me-3 text-white user-select-none">{{ post.time
                                            }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-4" v-if="post.image"></div>
                        <div class="py-5" v-if="post.image"></div>
                        <div class="py-4" v-if="post.image"></div>
                        <div class="p-2 bg-white text-dark d-flex flex-column align-items-start border-bottom border-1">

                            <small class="fw-normal mx-2 mt-4 mb-3">{{ post.comment }}</small>
                        </div>
                    </div>
                    <form ref="postForm" class="d-flex flex-column justify-content-center align-items-center"
                        enctype="multipart/form-data">
                        <div class="">
                            <textarea v-model="comment" style="resize: none" class="form-control" name="comment" id=""
                                cols="70" rows="4" placeholder="add a comment"></textarea>
                        </div>
                        <div>
                            <button class="btn border-0 bg-primary-subtle my-2" @click="submitForm">Comment</button>
                        </div>
                    </form>
                    <h5 class="display-5 fw-light fs-5 py-3">Comments</h5>
                    <div v-if="comments" class="py-1 bg-secondary-subtle p-2 rounded-2">
                        <div class="py-2 px-2 1 d-flex" v-for="comment in comments" :key="comment">
                            <!-- {{comment}} -->
                            <!-- { "commentID": 4, "commentText": "I'm good MrBud thanks for asking", "postID": 7, "userID": 8, "userName": "RandomUser", "userProfile": null } -->
                            <!-- {{user}} -->
                            <div class="d-flex w-100">
                                <div>
                                    <div class="profile_picture position-relative m-1 bg-secondary rounded-circle p-4"
                                        :style='{
                        "background-image": `url(${comment.userProfile})`
                    }'><i class="bi bi-person-fill position-absolute fs-4 top-50 start-50 translate-middle text-white"
                                            v-if="!comment.userProfile"></i></div>
                                </div>
                                <div class="d-flex flex-column align-items-start">
                                    <small class="text-secondary flex-fill p-1 mx-4 rounded-2 align-vertical">{{
                        comment.userName
                    }}<span :commentid="comment.commentID" v-if="user.id == comment.userID || user.role == 'admin'" @click="deleteComment"
                                            class="delete-comment text-danger align-vertical"
                                            style="font-size: small">&nbsp;&nbsp;delete</span></small>
                                    <small edit="false" :commentid="comment.commentID" :userCommentID="comment.userID" class=" d-flex flex-column bg-white text-secondary flex-fill px-2 border border-secondary-subtle border-2 py-1 mx-4 rounded-2">
                                        <span style="display: block">
                                            {{ comment.commentText }}
                                        </span>
                                        <textarea v-model="comment.commentText" class="form-control" cols="30" rows="10" placeholder="edit your comment"
                                            style="resize: none;display: none"></textarea>
                                        <span v-if="user.id == comment.userID || user.role == 'admin'" class="edit-comment text-primary text-end" style="font-size: small;display: block;" :commentid="comment.commentID" @click="editComment">
                                            edit
                                        </span>
                                        <span class="edit-comment text-primary text-end" style="font-size: small;display: none;"
                                            :comment="comment.commentText" :commentid="comment.commentID"
                                            @click="submitComment">submit</span>
                                    </small>
                                    <span style="font-size: x-small" class="align-middle px-4 mx-1 py-1 text-secondary">{{ convertTimeStamp(comment.commentTime) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CommentModal",
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        async submitForm(event) {
            event.preventDefault();

            let payload = {
                postID: this.post.postID,
                comment: this.comment
            }

            await this.$store.dispatch('addPostComment', payload);
            await this.$store.dispatch('getPostComments', payload.postID);
        },
        convertTimeStamp(timestamp) {
            let date = new Date(timestamp);
            let options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'UTC'
            };

            let formattedDate = date.toLocaleDateString('en-US', options);

            return formattedDate
        },
        async deleteComment(event) {
            let commentID = event.target.getAttribute('commentid');
            let payload = {
                postID: this.post.postID,
                commentID
            }
            await this.$store.dispatch('deletePostComment', payload);
            await this.$store.dispatch('getPostComments', payload.postID);
        },
        async editComment(event) {
            let commentElem = event.target.parentElement;
            let otherElems = commentElem.children;

            let commentID = commentElem.getAttribute('commentid');
            let userCommentID = commentElem.getAttribute('userCommentID');

            console.log(userCommentID)
            console.log('user: ', this.user);

            let state = commentElem.getAttribute('edit');

            alert(commentID);

            if( state.toLowerCase() === 'true' ){ // not being edited
                otherElems[0].style['display'] = 'block'
                otherElems[1].style['display'] = 'none'
                otherElems[2].style['display'] = 'block'
                otherElems[3].style['display'] = 'none'
                commentElem.setAttribute('edit', "false");
            } else { // being edited
                otherElems[0].style['display'] = 'none';
                otherElems[1].style['display'] = 'block'
                otherElems[2].style['display'] = 'none'
                otherElems[3].style['display'] = 'block'
                commentElem.setAttribute('edit', "true");
            }
        },
        async submitComment(event) {
            let commentElem = event.target.parentElement;
            let otherElems = commentElem.children;

            let state = commentElem.getAttribute('edit');

            if( state.toLowerCase() === 'true' ){
                otherElems[0].style['display'] = 'block'
                otherElems[1].style['display'] = 'none'
                otherElems[2].style['display'] = 'block'
                otherElems[3].style['display'] = 'none'
                commentElem.setAttribute('edit', "false");
            } else {
                otherElems[0].style['display'] = 'none'
                otherElems[1].style['display'] = 'block'
                otherElems[2].style['display'] = 'none'
                otherElems[3].style['display'] = 'block'
                commentElem.setAttribute('edit', "true");
            }

            let commentID = event.target.getAttribute('commentid');
            let payload = {
                postID: this.post.postID,
                commentID,
                comment: event.target.getAttribute('comment')
            }
            this.$store.dispatch('editPostComment', payload);
        }
    },
    computed: {
        user(){
            return this.$store.state.user;
        },
        post() {
            return this.$store.state.currentEditPost;
        },
        comments() {
            return this.$store.state.postComments;
        }
    }
}
</script>
<style scoped>
.media {
    background-position: center;
    background-size: cover;
}

.delete-comment {
    transition: 300ms;
    cursor: pointer;
}

.edit-comment {
    transition: 300ms;
    cursor: pointer;
}
</style>