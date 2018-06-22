# Consenticus
[![npm version](https://img.shields.io/npm/v/consenticus.svg?style=flat-square)](https://www.npmjs.org/package/consenticus)
[![npm downloads](https://img.shields.io/npm/dm/consenticus.svg?style=flat-square)](http://npm-stat.com/charts.html?package=consenticus)

Consenticus API client for the browser and node.js

## Installing

Using npm

```bash
$ npm install consenticus
```

Using cdn

```html
<script src="https://unpkg.com/consenticus/dist/consenticus.min.js"></script>
```

## How to use

### In browser

```html
<script>
    new consenticus("34ce08e9-3748-4e49-8ed8-2dbf0f566b70").getConsentRequest().then(consent_request_response => consent_request = consent_request_response.data);

    console.log(consent_request);
    // {uuid: "34ce08e9-3748-4e49-8ed8-2dbf0f566b70", consent_request: {…}, user: null}
</script>
```

## consenticus API

##### consenticus().auth_email(email)
##### consenticus().auth_callback(token)
##### consenticus().createConsent(params)
##### consenticus().getConsent(consent_uuid)
##### consenticus().getConsents()
##### consenticus().getConsentRequest([request_uuid])
##### consenticus().getConsentRequests()
##### consenticus().getEntity(entity_uuid)
##### consenticus().updateConsent(consent_uuid, params)


### Creating an Instance

You can create a new instance of consenticus with a consent_request UUID, custom host and auth_token

```js
const consenticus_instance = new consenticus(request_uuid, host="http://127.0.0.1:8000", auth_token="auth_token");
```

#### getEntity(entity_uuid)

```js
consenticus_instance.getEntity("365f0d37-5d3d-471a-aa38-ea11cc6cf399").then(entity_response => entity = entity_response.data);

<!-- entity -->
<!-- {uuid: "365f0d37-5d3d-471a-aa38-ea11cc6cf399", name: "Datafy.Network", country: "SI", address: "Ljubljana", phone: null, …} -->
```

#### getConsents()

```js
consenticus_instance.getConsents().then(consent_response => consent = consent_response.data);

<!-- consent -->
<!-- {count: 12, next: "http://127.0.0.1:8000/api/v1/consents?page=2", previous: null, results: Array(10)} -->
```

#### getConsentRequests()

```js
consenticus_instance.getConsentRequests().then(consent_response => consent_requests = consent_response.data);
```

#### createConsent(params)

```js
// example of parameters structure
let params = {
    "request_uuid": "user_consent_request_uuid",
    "rejected": false,
    "data_item_inputs": [
        {
            "data_item_uuid": "fe92335c-abb7-40d6-b1be-7e7300ed14f5", // DataItem uuid (i.e. email)
            "value": "email@email.com"
        }
    ],
    "consent_item_inputs": [
        {
            "consent_item_uuid": "210aec41-733c-4aa5-be74-e13902efaadf",
            "value": true
        },
        {
            "consent_item_uuid": "1dbf9fb2-f49f-4126-90e9-f29435515018",
            "value": false
        }
    ]
}

consenticus_instance.createConsent(params);
```