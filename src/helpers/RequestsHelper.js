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
        const response = await fetch(this.url + endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'authorization': `${authorizationToken}`
            },
            body: JSON.stringify(data),
        });
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
