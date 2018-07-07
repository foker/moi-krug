import { AsyncStorage } from "react-native";

const fetch = function(url, options){
    return new Promise(async (resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                try {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                } catch(e){
                    reject(e);
                }
            } else {
                reject(e);
            }
        };

        url = "http://192.168.1.69:3000"+url;

        let queryString = '';
        if (options.data) {

            Object.keys(options.data).forEach(function(key){
                url = url + (queryString.length ? '' : '&') + key + encodeURIComponent(options.data[key]);
            });
        }

        request.open(options.method || 'GET', url + queryString);

        if (options.method === 'POST') {
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        let sessionId;
        try {
            const session = await AsyncStorage.getItem('sessionId');
            if (value !== null) {
                sessionId = session;
            }
        }
        catch(error){}

        if (sessionId) {
            request.setRequestHeader('Cookie', `SID=${sessionId};`);
        }

// var body = options.body ? JSON.stringify(options.body) : undefined;
        let body = '';
        if (options.body) {
            let first = true;

            for (let key in options.body) {
                if (first) {
                    first = false;
                } else {
                    body = body + '&';
                }

                body = body + key + '=' + encodeURIComponent(options.body[key]);
            }
        }

        request.send(body);
    })
};

export default fetch;
