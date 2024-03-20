function getCurrentTimeStamp(){
    return (new Date()).toISOString().slice(0, 19).replace('T', ' ')
}

function encodeMsg(string){
    return Buffer.from(string, 'utf-8').toString('base64');
}
function decodeMsg(encString){
    let stringArray = encString.split(':')
    for(let i = 0; i < stringArray.length; i++){
        stringArray[i] = String.fromCharCode(stringArray[i]);
    }
    return stringArray.join('')
}

export {
    getCurrentTimeStamp,
    encodeMsg,
    decodeMsg
}