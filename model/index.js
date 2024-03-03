import { User } from './User.js';
import { Message } from './Message.js';
import { Code } from './StatusCodes.js';

const user = new User();
const message = new Message();
const code = new Code();

export {
    user,
    code,
    message
}