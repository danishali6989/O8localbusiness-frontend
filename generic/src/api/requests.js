import {getAppConfiguration} from '../config';

const renderResponse = (url, response) => {
    if (response) {
        
        switch (response.status) {
            case 200: {
                return response.json().catch((err) => {
                    return err.message;
                });
            }
            case 304: //TODO: Later
            default:
                throw new Error(
                    `[API error] Got status ${response.status} from ${url}`,
                );
        }
    }
};

const get = async (url) => {
    return fetch(
        url,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
        },
    )
        .then((response) => {
            return renderResponse(url, response);
        })
        .catch((resp) => {
            // if (__DEV__) {

            // }
            console.log(resp);
            return Promise.reject();

        });
};

const post = async (url, data) => {
    console.log('string', JSON.stringify(data))
    return fetch(
        url,{
            method: 'POST',
            headers: {
                CompanyId:0,
                Accept: 'application/json',
                "Content-Type": "application/json",


            },
            body:JSON.stringify(data),
        },
    )
        .then((response) => renderResponse(url, response))
        .catch((resp) => {
            // if (__DEV__) {

            // }
            console.log("resp",resp);
            return Promise.reject();
        });
};

const delte = async (url) => {
    return fetch(
        url,{
            method: 'POST',
            headers: {
                CompanyId:0,
                Accept: 'application/json',
                "Content-Type": "application/json",


            },
        },
    )
        .then((response) => renderResponse(url, response))
        .catch((resp) => {
            // if (__DEV__) {

            // }
            console.log("resp",resp);
            return Promise.reject();
        });
};



export {post, get,delte};

