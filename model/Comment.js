import {
    connection as db
} from '../config/index.js';
import {
    code,
    comment,
    post
} from '../model/index.js';
import {
    verifyAToken
} from '../middleware/UserAuthentication.js';
import {
    handleAuthError
} from '../middleware/ErrorHandling.js';
import util from 'util';

const dbAsync = util.promisify(db.query).bind(db);

class Comment {
    async fetchComment(req, res) {
        let token = req.headers['authorization'];
        let postID = +req.params.postID;
        let commentID = +req.params.cID;

        if (!token) {
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please login in"
            })
        } else {
            token = token.split(' ').at(-1);
        }

        try {
            let user = verifyAToken(token);

            const getPost = `SELECT userID, postID FROM Posts WHERE postID = ?;`;

            let result = await dbAsync(getPost, [postID]);

            if (result.length == 0) {
                res.status(code.NOTFOUND).send({
                    status: code.NOTFOUND,
                    msg: "Post does not exist"
                })
                return;
            }

            const getPostComment = `SELECT commentID, commentText, postID, userID FROM Comments WHERE postID = ? AND commentID = ?;`;

            db.query(getPostComment, [postID, commentID], (err, result) => {
                if (err) throw err;
                if (result.length) {
                    res.status(code.OK).send({
                        status: code.OK,
                        result
                    })
                } else {
                    res.status(code.NOTFOUND).send({
                        status: code.NOTFOUND,
                        msg: "Comment not found"
                    })
                }
            });
        } catch (e) {
            console.log(e);
            handleAuthError(e);
        }
    }
    fetchComments(req, res) {
        let token = req.headers['authorization'];
        let postID = +req.params.postID;

        if (!token) {
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please login in"
            })
            return;
        } else {
            token = token.split(' ').at(-1);
        }

        try {
            let user = verifyAToken(token);

            const getPostComments = `SELECT commentID, commentText, postID, Comments.userID, Users.userName, Users.userProfile FROM Comments LEFT JOIN Users ON Comments.userID = Users.userID WHERE postID = ?`;

            db.query(getPostComments, [postID], (err, result) => {
                if (err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    result
                })
            });
        } catch (e) {
            console.log(e);
            handleAuthError(e, req, res);
        }
    }
    async addComment(req, res) {
        let token = req.headers['authorization'];
        let data = req.body;

        if (!token) {
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please login in"
            })
        } else {
            token = token.split(' ').at(-1);
        }

        if ( !data.comment || !data.postID ) {
            res.status(code.BADREQUEST).send({
                status: code.BADREQUEST,
                msg: "Please provide a comment and postID"
            })
            return;
        }

        try {
            let user = verifyAToken(token);

            // check if the post exists
            const getPost = `SELECT userID, postID FROM Posts WHERE postID = ?;`;
            let pResult = await dbAsync(getPost, [data.postID])

            if( pResult.length == 0 ){
                res.status(code.NOTFOUND).send({
                    status: code.NOTFOUND,
                    msg: "Post does not exist"
                })
                return;
            }

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`;

            let result = await dbAsync(getUserID, [user.email]);
            const { userID } = result[0];

            const insertComment = `INSERT INTO Comments SET ?`;

            let payload = {
                commentText: data.comment,
                postID: data.postID,
                userID: userID,
                commentTime: (new Date()).toISOString().slice(0, 19).replace('T', " ")
            }

            db.query(insertComment, [payload], (err, result) => {
                if (err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    result
                })
            });
        } catch (e) {
            console.log(e);
            handleAuthError(e);
        }
    }
    async updateComment(req, res) { // PATCH
        let token = req.headers['authorization'];
        let postID = +req.params.postID;
        let commentID = +req.params.cID;
        let data = req.body;

        
        if (!token) {
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please login in"
            })
            return;
        } else {
            token = token.split(' ').at(-1);
        }

        if (!data.comment) {
            res.status(code.BADREQUEST).send({
                status: code.BADREQUEST,
                msg: "Invalid comment"
            })
            return;
        }

        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`

            let result = await dbAsync(getUserID, [user.email]);
            const {
                userID
            } = result[0];

            console.log(userID)
            // check if comment exists
            const getComment = `SELECT commentID, userID, postID FROM Comments WHERE commentID = ? AND userID = ? AND postID = ?;`;

            let cResult = await dbAsync(getComment, [commentID, userID, postID]);
            if(cResult.length <= 0){
                res.status(code.OK).send({
                    status: code.OK,
                    msg: "Comment invalid"
                })
                return;
            }

            const updatePostComment = `UPDATE Comments SET ? WHERE postID = ? AND commentID = ? AND userID = ?;`;

            let payload = {
                commentText: data.comment
            }

            db.query(updatePostComment, [payload, postID, commentID, userID], (err) => {
                if (err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    msg: "Comment updated"
                })
            })
        } catch (e) {
            console.log(e);
        }
    }
    async deleteComment(req, res) {
        let token = req.headers['authorization'];
        let postID = +req.params.postID;
        let commentID = +req.params.cID;

        
        if (!token) {
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please login in"
            })
            return;
        } else {
            token = token.split(' ').at(-1);
        }
        
        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail, userRole FROM Users WHERE userEmail = ?;`;

            let result = await dbAsync(getUserID, [user.email]);
            const {
                userID,
                userRole
            } = result[0];

            const getPost = `SELECT postID, commentID, userID FROM Comments WHERE postID = ? AND commentID = ?`;

            let post = await dbAsync(getPost, [postID, commentID]);
            if(!post.length){
                res.status(code.NOTFOUND).send({
                    status: code.NOTFOUND,
                    msg: "Comment does not exist"
                })
                return;
            }
            let postUserID = post[0].userID;
            if( userID == postUserID || (user.role == 'admin' && userRole == 'admin') ){
                const deletePostComment = `DELETE FROM Comments WHERE postID = ? AND commentID = ?`;

                db.query(deletePostComment, [postID, commentID], (err, result) => {
                    if (err) throw err;
                    res.status(code.OK).send({
                        status: code.OK,
                        msg: "Comment deleted"
                    })
                })
            } else {
                res.status(code.FORBIDDEN).send({
                    status: code.FORBIDDEN,
                    msg: "You cannot delete this comment"
                })
            }

        } catch (e) {
            console.log(e);
            handleAuthError(e, req, res);
        }
    }
    async deleteComments(req, res){
        let token = req.headers['authorization'];
        let _postID = +req.params.postID;

        if( !token ){
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please login in"
            })
        } else {
            token = token.split(' ').at(-1);
        }

        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`;

            let result = await dbAsync(getUserID, [user.email]);
            const {
                userID
            } = result[0];

            const getUserComments = `SELECT commentID, postID, userID FROM Comments WHERE postID = ? AND userID = ?;`;

            let pResult = await dbAsync(getUserComments, [_postID, userID])
            if( pResult.length <= 0 ){
                res.status(code.NOTFOUND).send({
                    status: code.NOTFOUND,
                    msg: "No comments found"
                })
                return;
            }

            const deletePostComment = `DELETE FROM Comments WHERE postID = ? AND userID = ?;`;

            db.query(deletePostComment, [_postID, userID], (err, result) => {
                if (err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    msg: "Comments deleted"
                })
            })
        } catch (e) {
            console.log(e);
            handleAuthError(e, req, res);
        }
    }
}

export {
    Comment
}