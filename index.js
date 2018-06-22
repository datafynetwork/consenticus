'use strict';

import axios from 'axios';

class Consenticus {
    constructor(request_uuid, host = null, auth_token = null) {
        this.request_uuid = request_uuid;
        if (host !== null) {
            this.host = host;
        } else {
            // TODO Change this with production URL
            this.host = 'http://127.0.0.1:8000';
        }

        this.auth_token = auth_token;

        if (this.auth_token) {
            this.http_auth = 'Token ' + this.auth_token;
        } else {
            this.http_auth = null;
        }

        this.headers = {
            "Authorization": this.http_auth
        }
    }

    // AUTHENTICATION

    auth_email(email) {
        // Authorize user via email
        let params = {
            "email": email
        };

        return axios.post(this.host + '/api/v1/auth/email', params, {
                crossdomain: true
            })
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
    }

    auth_callback(token) {
        // Send token to /api/v1/auth/callback and receive authorization token
        let auth_token;

        let params = {
            "token": token
        };

        axios.post(this.host + '/api/v1/auth/callback', params, {
                crossdomain: true
            })
            .then(response => {
                this.http_auth = 'Token ' + response.data.token  // Use this for headers
                this.headers.HTTP_AUTHORIZATION = this.http_auth;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
    }

    _get(url) {
        return axios.get(this.host + url, {
            headers: this.headers
            })
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                }
                // console.log(error.config);
            });
    }

    getConsents() {
        return this._get('/api/v1/consents');
        //   consenticus.getConsents().then(consent_response => consents = consent_response.data);
    }

    getConsent(consent_uuid) {
        return this._get('/api/v1/consents/' + consent_uuid);
    }

    createConsent(params) {
        // Make a POST request to api/v1/consents
        return axios.post(this.host + '/api/v1/consents', params, {
                crossdomain: true
            })
            .then(function (response) {
                console.log(response);
                if (document.getElementsByClassName('form-messages').length) {
                    document.getElementsByClassName('form-messages')[0].innerHTML = '<p class="green-text">' + response.statusText + ' (' + response.status + ')</p>';
                }
                return response;
                // email_field.value = '';
                // checkbox_field.checked = false;
                // checkbox_field_2.checked = false;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    // console.log(error.response.headers);
                    if (document.getElementsByClassName('form-messages').length) {
                        document.getElementsByClassName('form-messages')[0].innerHTML = '<p class="red-text">' + error.response.request.responseText + '</p>';
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    // console.log(error.request);
                    if (document.getElementsByClassName('form-messages').length) {
                        document.getElementsByClassName('form-messages')[0].innerHTML = '<p class="red-text">' + error.message + '</p>';
                    }
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // console.log('Error', error.message);
                }
                // console.log(error.config);
            });
    }

    updateConsent(consent_uuid, params) {
        return axios.put(this.host + '/api/v1/consents/' + consent_uuid, params, {
            crossdomain: true
        })
        .then(function (response) {
            console.log(response);
            return response;
            // email_field.value = '';
            // checkbox_field.checked = false;
            // checkbox_field_2.checked = false;
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
            }
            // console.log(error.config);
        });
    }

    getConsentRequests() {
        // Load user's consent requests
        return this._get('/api/v1/consent_requests');
    }

    getConsentRequest(request_uuid = null) {
        if (request_uuid === null) {
            request_uuid = this.request_uuid
        }
        // get consent request with this.request_uuid
        return this._get('/api/v1/consent_requests/' + request_uuid);
    }

    getEntity(entity_uuid) {
        return this._get('/api/v1/entities/' + entity_uuid);
    }
}

module.exports = Consenticus;
