import { get } from 'http';
import { connection as db } from '../config/index.js';
import { verifyAToken } from '../middleware/UserAuthentication.js';
import { code } from '../model/index.js';
import { handleAuthError } from '../middleware/ErrorHandling.js';
import util from 'util';

const dbAsync = util.promisify(db.query).bind(db);

class Post {
    fetchPost(req, res){
        let token = req.headers['authorization'];
        let postID = +req.params.postID;

        if( !token ){
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please login in"
            })
        } else {
            token = token.split(' ').at(-1);
        }

        if( !postID ) {
            res.status(code.NOTFOUND).send({
                status: code.NOTFOUND,
                msg: "The post you trying to access is invalid"
            })
            return;
        }

        try {
            let user = verifyAToken(token);

            const qry = `SELECT postMedia, postComment FROM Posts WHERE postID = ?;`;

            db.query(qry, [postID], (err, result)=>{
                if(err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    result
                })
            })
        } catch(e) {
            console.log(e);
            handleAuthError(e, req, res);
        }
    }
    fetchPosts(req, res){
        let token = req.headers['authorization'];

        // fetch('URL_GOES_HERE', { 
        //     method: 'post', 
        //     headers: new Headers({
        //         'Authorization': 'Basic '+btoa('username:password'),
        //         'Authorization': 'Bearer '+token,
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }), 
        //     body: 'A=1&B=2'
        // });
        
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

            const qry = `SELECT postID, postMedia, postComment, userID, postTime FROM Posts;`

            db.query(qry, (err, result)=>{
                if(err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    result
                })
            })

        } catch(e) {
            console.log(e)
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Token is invalid"
            })
        }
    }
    async addPost(req, res){
        let token = req.headers['authorization'];
        let data = req.body;

        
        if( !token ){
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please login in"
            })
            return;
        } else {
            token = token.split(' ').at(-1);
        }
        
        let query = [!data.media, !data.comment]
        let usablequery = query.filter((item) => {
            return item == false
        });

        if( usablequery.length == 0 ){
            res.status(code.BADREQUEST).send({
                status: code.BADREQUEST,
                msg: "Please provide media or a comment for your post"
            })
            return;
        }


        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`
            let result = await dbAsync(getUserID, [user.email]);
            
            const { userID, userEmail } = result[0]; 

            let payload = {
                postMedia: data.media,
                postComment: data.comment,
                userID: userID,
                postTime: (new Date()).toISOString().slice(0, 19).replace('T', ' ')
            }

            const qry = `INSERT INTO Posts SET ?;`;

            db.query(qry, [payload], (err)=>{
                if(err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    msg: "Post inserted successfully"
                })
            })
        } catch(e) {
            console.log(e);
            handleAuthError(e, req, res);
        }
    }
    async updatePost(req, res){ // PATCH
        let _postID = +req.params.postID;
        let token = req.headers['authorization']
        let data = req.body;

        if( !token ){
            res.status(code.UNAUTHORIZED).send({
                status: code.UNAUTHORIZED,
                msg: "Please login in"
            })
            return;
        } else {
            token = token.split(' ').at(-1);
        }

        let query = [!data.media, !data.comment]
        let usablequery = query.filter((item) => {
            return item == false
        });

        if( usablequery.length == 0 ){
            res.status(code.BADREQUEST).send({
                status: code.BADREQUEST,
                msg: "Please provide media or a comment for your post"
            })
            return;
        }

        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`;

            let result = await dbAsync(getUserID, [user.email]);

            const dbUser = result[0];
            let _userID = dbUser.userID;

            let payload = {
                postComment: data.comment,
                postMedia: data.media
            }

            const getPost = `SELECT userID, postID FROM Posts WHERE postID = ?;`;

            let pResult = await dbAsync(getPost, [_postID]);
            const { postID, userID } = pResult[0];

            if( _userID == userID ){
                const updatePost = `UPDATE Posts SET ? WHERE userID = ? AND postID = ?;`;
    
                db.query(updatePost, [payload, userID, postID], (err)=>{
                    if(err) throw err;
                    res.status(code.OK).send({
                        status: code.OK,
                        msg: "Post Updated"
                    })
                })
            } else {
                res.status(code.FORBIDDEN).send({
                    status: code.FORBIDDEN,
                    msg: "This is not your post"
                })
            }
        } catch(e) {
            console.log(e)
            handleAuthError(e, req, res);
        }
    }
    async deletePost(req, res){
        let token = req.headers['authorization'];
        let _postID = +req.params.postID;
        
        if( !token ){
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

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`;

            let result = await dbAsync(getUserID, [user.email]);
            const dbUser = result[0];
            let userID = dbUser.userID;

            const getUserPost = `SELECT userID, postID FROM Posts WHERE postID = ?;`;

            let uResult = await dbAsync(getUserPost, [_postID]);
            if( uResult.length <= 0 ) {
                res.status(code.NOTFOUND).send({
                    status: code.NOTFOUND,
                    msg: "Post does not exist"
                })
                return;
            }
            const dbPost = uResult[0];

            if( userID == dbPost.postID || user.role == "admin" ){
                const deleteUserPost = `DELETE FROM Posts WHERE postID = ?;`;
    
                db.query(deleteUserPost, [_postID], (err, result)=>{
                    if(err) throw err;
                    res.status(code.OK).send({
                        status: code.OK,
                        msg: "Post deleted"
                    })
                })
            }
        } catch(e) {
            console.log(e);
            handleAuthError(e, req, res);
        }
    }
}

export {
    Post
}