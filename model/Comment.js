import {
    connection as db
} from '../config/index.js';
import {
    code,
    comment
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

        console.log(token);

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

            const getPostComment = `SELECT commentID, commentText, postID FROM Comments WHERE postID = ? AND commentID = ?;`;

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
        } else {
            token = token.split(' ').at(-1);
        }

        try {
            let user = verifyAToken(token);

            const getPostComments = `SELECT commentID, commentText, postID FROM Comments WHERE postID = ?`;

            db.query(getPostComments, [postID], (err, result) => {
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
    async addComment(req, res) {
        let token = req.headers['authorization'];
        let data = req.body;

        console.log(data);

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
        let postID = req.params.postID;
        let commentID = req.params.cID;
        let data = req.body;

        if (!data.comment) {
            res.status(code.BADREQUEST).send({
                status: code.BADREQUEST,
                msg: "Invalid comment"
            })
        }

        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`

            let result = await dbAsync(getUserID, [user.email]);
            const {
                userID
            } = result[0];

            const updatePostComment = `UPDATE Comments SET ? WHERE postID = ? AND commentID = ? AND userID = ?;`;

            let payload = {
                commentText: data.comment
            }

            db.query(updatePostComment, [payload, postID, commentID, userID], (err, result) => {
                if (err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    result
                })
            })
        } catch (e) {
            console.log(e);
        }
    }
    async deleteComment(req, res) {
        let token = req.headers['authorization'];
        let postID = req.params.postID;
        let commentID = req.params.cID;

        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`;

            let result = await dbAsync(getUserID, [user.email]);
            const {
                userID
            } = result[0];

            const deletePostComment = `DELETE FROM Comment WHERE postID = ? AND commentID = ? AND userID = ?;`;

            db.query(deletePostComment, [postID, commentID, userID], (err, result) => {
                if (err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    result
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