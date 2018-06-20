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

##### consenticus().createConsent(params)
##### consenticus().getConsent()
##### consenticus().getConsents()
##### consenticus().getConsentRequest([request_uuid])
##### consenticus().getConsentRequests()
