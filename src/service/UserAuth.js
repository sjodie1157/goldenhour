import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

class method {
    get = "GET";
    post = "POST";
    delete = "DELETE";
    patch = "PATCH";
}

async function sendRequest(url, method="GET", data=null) {
    let authToken = cookies.get('authToken');
    let requestParams = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        }
    }
    if( data ) {
        requestParams['body'] = JSON.parse(data);
    }
    let result = await fetch(url, requestParams);
    return result;
}
function getUserFromToken(){
    return JSON.parse( atob( cookies.get('authToken').split('.')[1] ) );
}

export {
    sendRequest,
    method,
    getUserFromToken
}