import express from 'express';
import { post } from '../model/index.js';
import { commentRouter, commentsRouter } from './CommentsController.js';
import bodyParser from 'body-parser';

const postRouter = express.Router();
const postsRouter = express.Router();

postsRouter.get('/', (req, res)=>{
    try {
        post.fetchPosts(req, res);
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

postRouter.get('/:postID', (req, res)=>{
    try {
        post.getPost(req, res);
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
postRouter.use('/comments', commentsRouter);

export {
    postRouter,
    postsRouter
}