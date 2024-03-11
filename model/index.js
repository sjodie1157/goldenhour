import { User } from './User.js';
import { Code } from './StatusCodes.js';
import { Post } from './Post.js';
import { Comment } from './Comment.js';

const user = new User();
const code = new Code();
const post = new Post();
const comment = new Comment();

export {
    user,
    code,
    post,
    comment
}