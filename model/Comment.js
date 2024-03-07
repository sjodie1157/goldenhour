import {
    connection as db
} from '../config/index.js';
import {
    code, comment
} from '../model/index.js';
import {
    verifyAToken
} from '../middleware/UserAuthentication.js';
import {
    handleAuthError
} from '../middleware/ErrorHandling.js';

class Comment {
    fetchComment(req, res) {
        let postID = req.params.postID;
        let commentID = req.params.cID;
        let token = req.headers['authorization'];

        try {
            let user = verifyAToken(token);

            const getPostComment = `SELECT commentID, commentText, postID FROM Comments WHERE postID = ? AND commentID = ?;`;

            db.query(getPostComment, [postID, commentID], (err, result) => {
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
    fetchComments(req, res) {
        let postID = req.params.postID;
        let token = req.headers['authorization'];

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
        let postID = req.params.postID;
        let token = req.headers['authorization'];
        let data = req.body;

        if( !data.comment ){
            res.status(code.BADREQUEST).send({
                status: code.BADREQUEST,
                msg: "Please provide a comment"
            })
        }

        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`;

            let result = await dbAsync(getUserID, [user.email]);
            const {
                userID
            } = result[0];

            const insertComment = `INSERT INTO Comments SET ?`;

            let payload = {
                commentText: comment,
                postID: postID,
                userID: userID,
                commentTime: 'sometime'
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
    updateComment(req, res) {
        let token = req.headers['authorization'];

        try {
            let user = verifyAToken(token);

            
        } catch(e) {
            console.log(e);
        }
    }
    deleteComment(req, res) {}
}

export {
    Comment
}