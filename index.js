'use strict';

import axios from 'axios';

class Consenticus {
  // Init variables length and breadth
  constructor(request_uuid) { 
    this.request_uuid = request_uuid;
  }

  getConsents(){

  }

  getConsentRequests(){

  }
  
  getConsentRequest(request_uuid=null) {
      if (request_uuid === null) {
          request_uuid = this.request_uuid
      }
      // get consent request with this.request_uuid
      return axios.get('http://127.0.0.1:8000/api/v1/consent_requests/' + request_uuid)
              .then(response => {
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

  getUser(entity_uuid) {

  }

  createConsent(params) {
      // Make a POST request to api/v1/consents
      axios.post('http://127.0.0.1:8000/api/v1/consents', params, {
                  crossdomain: true
              })
              .then(function (response) {
                  console.log(response);
                  if(document.getElementsByClassName('form-messages').length) {
                      document.getElementsByClassName('form-messages')[0].innerHTML = '<p class="green-text">'+ response.statusText +' (' + response.status + ')</p>';
                  }
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
                      if(document.getElementsByClassName('form-messages').length) {
                          document.getElementsByClassName('form-messages')[0].innerHTML = '<p class="red-text">'+ error.response.request.responseText + '</p>';
                      }
                  } else if (error.request) {
                      // The request was made but no response was received
                      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                      // http.ClientRequest in node.js
                      // console.log(error.request);
                      if(document.getElementsByClassName('form-messages').length) {
                          document.getElementsByClassName('form-messages')[0].innerHTML = '<p class="red-text">'+ error.message + '</p>';
                      }
                  } else {
                      // Something happened in setting up the request that triggered an Error
                      // console.log('Error', error.message);
                  }
                  // console.log(error.config);
              });
  }

  getConsent(){
      
  }
}

module.exports = Consenticus;
