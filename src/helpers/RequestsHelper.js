export default class RequestsHelper {
    constructor(url) {
        this.url = url;
    }

    async get(endpoint, authorizationToken = null) {
        const response = await fetch(this.url + endpoint, {
            method: "GET",
            headers: {
                'authorization': `${authorizationToken}`
            }
        });
        const responseData = await response.json();
        return responseData;
    }

    async post(endpoint, data, authorizationToken = null) {
        const response = await fetch(this.url + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': `${authorizationToken}`
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    }

    async put(endpoint, data, authorizationToken = null) {
        console.log(JSON.stringify(data));
        const response = await fetch(this.url + endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'authorization': `${authorizationToken}`
            },
            body: JSON.stringify(data),
        });
        /**
         * https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
         * The 204 response MUST NOT include a message-body, and thus is always terminated by the first empty line after the header fields.
         */
        if(response.status === 204) {
            return { statusCode: response.status };
        }
        const responseData = await response.json();
        return responseData;
    }

    async delete(endpoint, authorizationToken = null) {
        const response = await fetch(this.url + endpoint, {
            method: "DELETE",
            headers: {
                'authorization': `${authorizationToken}`
            }
        });
        const responseData = await response.json();
        return responseData;
    }
}
