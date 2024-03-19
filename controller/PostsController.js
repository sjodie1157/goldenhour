import express from 'express';
import { post } from '../model/index.js';
import { commentRouter, commentsRouter } from './CommentsController.js';
import bodyParser from 'body-parser';
import { upload } from '../middleware/ImageStorage.js';

const postRouter = express.Router();
const postsRouter = express.Router();

postsRouter.get('/', (req, res)=>{
    try {
        post.fetchPosts(req, res);
    } catch(e) {
        console.log(e);
    }
})
postsRouter.get('/updateposts/:postCount', (req, res)=>{
    try {
        post.newPost(req, res);
    } catch(e) {
        console.log(e);
    }
})
postsRouter.post('/', (req, res)=>{
    try {
        post.addPost(req, res);
    } catch(e) {
        console.log(e);
    }
})

postRouter.post('/upload', upload.single('file'), async (req, res)=>{
    try {
        post.uploadPostImage(req, res);
    } catch(e) {
        console.log(e);
    }
})
postRouter.get('/:postID', (req, res)=>{
    try {
        post.fetchPost(req, res);
    } catch(e) {
        console.log(e);
    }
})
postRouter.put('/:postID', bodyParser.json(), (req, res)=>{
    try {
        post.updatePost(req, res);
    } catch(e) {
        console.log(e);
    }
})
postRouter.delete('/:postID', bodyParser.json(), (req, res)=>{
    try {
        post.deletePost(req, res);
    } catch(e) {
        console.log(e);
    }
})

postRouter.use('/comment', commentRouter);
postRouter.use('/:postID/comment', commentRouter);
postRouter.use('/:postID/comments', commentsRouter);

export {
    postRouter,
    postsRouter
}