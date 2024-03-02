import { connection as db } from '../config/index.js';
import { mail } from '../middleware/MailingService.js';

class User {
    // admin will be able to block/unblock users even suspend(ban);
    // privs are: user, premium(can have a video on there profile), admin
    fetchUser(req, res){
        // this function will fetch the user using this function if privledges is user.
        // admin can fetch any user
        let id = req.params.id;

        const qry = `SELECT * FROM Users WHERE userID = ${id}`;

        db.query(qry, (err, result)=>{
            if(err) throw err;
            res.json({
                result
            })
        });
    }
    fetchUsers(req, res){
        // only admin can use this function
    }
    createUser(req, res){
        // can only create user accounts
        // account has to be upgraded to premium
        // age restriction, 13+
    }
    updateUser(req, res){
        // appropriate user can only update fields themselves
    }
    deleteUser(req, res){
        // appropriate user can delete themselves
    }
    login(req, res){
        // get device info on login
        // will login user and retrieve a jwt session that will by default expire in 1 hr unless set to 30days or a week
    }
    logout(req, res){
        // this will logout the user
        // this will blacklist a jwt token if not yet expired
    }
    upgradeUser(req, res){
        // can only upgrade to premium user
        // premium user can have videos on their profiles
        // advanced profiles
    }
    getLoggedInDevices(req, res){
    }
    forgotPassword(req, res){
        res.json({
            status: 200,
            msg: "email will be sent soon."
        })
        // mail()
    }

}

export {
    User
}