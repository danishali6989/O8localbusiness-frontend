import { getAppConfiguration } from '../config';

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

const getid = async (url, id, token) => {

    return fetch(
        url,
        {
            method: 'GETID',
            headers: {
                CompanyId: 0,
                Accept: 'application/json',
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ''
            },
            body: id ? JSON.stringify(id) : null,

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


const get = async (url, token) => {

    return fetch(
        url,
        {
            method: 'GET',
            headers: {
                CompanyId: 1,
                Accept: 'application/json',
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ''
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

const post = async (url, { data, token }) => {
    console.log("url", url, data, token)

    return fetch(
        url, {
        method: 'POST',
        headers: {
            CompanyId: 1,
            Accept: 'application/json',
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ``

        },
        body: data ? JSON.stringify(data) : null,
    },
    )
        .then((response) => renderResponse(url, response))
        .catch((resp) => {
            // if (__DEV__) {

            // }
            console.log("resp", resp);
            return Promise.reject();
        });
};

const delte = async (url) => {
    return fetch(
        url, {
        method: 'POST',
        headers: {
            CompanyId: 0,
            Accept: 'application/json',
            "Content-Type": "application/json",


        },
    },
    )
        .then((response) => renderResponse(url, response))
        .catch((resp) => {
            // if (__DEV__) {

            // }
            console.log("resp", resp);
            return Promise.reject();
        });
};



export { post, get, delte,getid };

