import express from 'express';
import { comment } from '../model/index.js';

const commentRouter = express.Router();
const commentsRouter = express.Router();

commentRouter.get('/:cID', (req, res)=>{
    try {
        comment.fetchComment(req, res);
    } catch(e) {
        console.log(e);
    }
});
commentRouter.post('/', (req, res)=>{
    try {
        comment.addComment(req, res);
    } catch(e) {
        console.log(e);
    }
});
commentRouter.put('/:cID', (req, res)=>{
    try {
        comment.updateComment(req, res);
    } catch(e) {
        console.log(e);
    }
});
commentRouter.delete('/:cID', (req, res)=>{
    try {
        comment.deleteComment(req, res);
    } catch(e) {
        console.log(e);
    }
});
commentRouter.delete('/', (req, res)=>{
    try {
        comment.deleteComment(req, res);
    } catch(e) {
        console.log(e)
    }
})

commentsRouter.get('/', (req, res)=>{
    try {
        comment.fetchComments(req, res);
    } catch(e) {
        console.log(e);
    }
})

export {
    commentRouter,
    commentsRouter
}