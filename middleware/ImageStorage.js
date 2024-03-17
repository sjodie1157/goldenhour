import multer from 'multer';
import imgbbUploader from "imgbb-uploader";
import util from "util";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

async function uploadImage(file) {
    console.log('uploadfile: ', file)
    
    const options = {
        apiKey: process.env.IMGBB_API_KEY,
        name: file.originalname,
        base64string: Buffer.from(file.buffer).toString('base64')
    };
    return await imgbbUploader(options)
}

export {
    upload,
    uploadImage
}