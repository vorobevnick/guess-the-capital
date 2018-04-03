'use strict';

module.exports = {
    loadJson(url,options) {
        options = options || {};
        let xhr = new XMLHttpRequest();
        let method = options.method || 'GET';

        xhr.open(method, url, true);

        let promise = new Promise(function (resolve, reject) {
            // this._showSpinner();

            xhr.onload = function () {

                if (xhr.status !== 200) {
                    reject();
                    return;
                }

                resolve(JSON.parse(xhr.responseText));
            };

            xhr.onerror = function () {
                reject();
            };

            xhr.send();
        });

        return promise
            .catch(function() {
                let error = new Error(xhr.status + ': ' + xhr.statusText);

                console.error('Ajax error', error);

                throw error;
            });
    }
};