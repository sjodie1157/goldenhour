import { get } from 'http';
import { connection as db } from '../config/index.js';
import { verifyAToken } from '../middleware/UserAuthentication.js';
import { code } from '../model/index.js';
import util from 'util';

const dbAsync = util.promisify(db.query).bind(db);

class Post {
    fetchPost(req, res){
        let token = req.headers['authorization'];
        try {
            let postID = +req.params.id;

            if( !postID ) {
                res.status(code.NOTFOUND).send({
                    status: code.NOTFOUND,
                    msg: "The post you trying to access is invalid"
                })
            }

            let user = verifyAToken(token);

            const qry = `SELECT postID, userMedia, userComment, userID FROM Posts WHERE postID = ?;`;

            db.query(qry, [postID], (err, result)=>{
                if(err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    result
                })
            })
        } catch(e) {
            console.log(e);
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

        try {
            let user = verifyAToken(token);

            const qry = `SELECT postID, userMedia, userComment, userID FROM Posts;`

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

        let query = [!data.media, !data.comment]

        let usablequery = query.filter((item) => {
            return item == true
        });

        if( usablequery.length == 0 ){
            res.status(code.BADREQUEST).send({
                status: code.BADREQUEST,
                msg: "Please provide media or a comment for your post"
            })
        }

        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Users WHERE userEmail = ?;`
            let result = await dbAsync(getUserID, [user.email]);
            
            const { userID, userEmail } = result[0]; 

            let payload = {
                postMedia: data.media,
                postComment: data.comment,
                userID: userID
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
        }
    }
    async updatePost(req, res){ // PATCH
        let postID = req.params.postID;
        let data = req.body;

        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Posts WHERE userEmail = ?;`;

            let result = await dbAsync(getUserID, [user.email]);

            const { userID } = result[0];
            let payload = {
                postComment: data.comment,
                postMedia: data.media
            }
            const updatePost = `UPDATE FROM Posts SET ? WHERE userID = ? AND postID = ?`;

            db.query(updatePost, [payload, userID, postID], (err)=>{
                if(err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    msg: "Post Updated "
                })
            })
        } catch(e) {
            console.log(e)
        }
    }
    async deletePost(req, res){
        let postID = req.params.postID;
        let data = req.body;

        try {
            let user = verifyAToken(token);

            const getUserID = `SELECT userID, userEmail FROM Posts WHERE userEmail = ?;`;

            let result = await dbAsync(getUserID, [user.email]);

            const { userID } = result[0];

            const deletePost = `DELETE FROM Posts WHERE userID = ? AND postID = ?;`;

            db.query(deletePost, [userID, postID], (err)=>{
                if(err) throw err;
                res.status(code.OK).send({
                    status: code.OK,
                    msg: "Post Updated "
                })
            })
        } catch(e) {
            console.log(e)
        }
    }
}

export {
    Post
}