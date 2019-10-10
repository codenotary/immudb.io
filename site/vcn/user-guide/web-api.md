# Web API

Notarization and authentication can also be used via a simple HTTP API. You can use:

- the CodeNotary hosted API at https://api.codenotary.it/
- or a local web server exposing the same API by running the `vcn serve` command

All endpoints accept *Basic Auth* with user credentials (mantatory for notarization).
By default the login password is used as notarization password too.
If a custom notarization password is needed add the `x-notarization-password: <your_password>` header, otherwise if you have set an empty notarization password add the `x-notarization-password-empty: yes` header instead.

## Notarization

**Endpoints**
- POST `/notarize`
- POST `/untrust`
- POST `/unsupport`

**Query params**
- `public` (if present and not empy will set the visibility to public, otherwise private)

**Body request**
```js
{
  "kind": "file", // string, optional
  "name": "filename.pdf", // string
  "hash": "......", // string
  "size": 4096, // int, optional, must be equal or greater than zero
  "contentType": "application/pdf", // string, optional
  "metadata": { // object, optional
    // ...
  }
}
```

**Body response**
Same as authentication, see below.

## Authentication

**Endpoint**
- GET `/authentication/<hash>`

**Query params**
- `signers` comma-separated list of SignerID(s)
- `org` organization ID
> `org` if present, takes precedence over `signers`

**Body response**

Results are indentical to ones of `vcn authenticate <asset> --output=json`.
> Status and level codes explanation can be found [here](notarization.md#Statuses)

Example of unverified asset:
```json
{
  "kind": "",
  "name": "",
  "hash": "",
  "size": 0,
  "contentType": "",
  "url": "",
  "metadata": null,
  "visibility": "",
  "createdAt": "",
  "verificationCount": 0,
  "signerCount": 0,
  "signer": "",
  "company": "",
  "website": "",
  "verification": {
    "level": 0,
    "owner": "",
    "status": 2,
    "timestamp": ""
  }
}
```

Example of a trusted asset with all field populated:
```json
{
  "kind": "file",
  "name": "vcn-v0.6.3-linux-amd64",
  "hash": "cabea5ccdf9380775f1d40fd2a1baec8ee697ecf107f13283bcfc08bd0c9df65",
  "size": 16433816,
  "contentType": "application/x-executable",
  "url": "...",
  "metadata": {
    "architecture": "x86_64",
    "file": {
      "arch": "X86_64",
      "format": "ELF",
      "platform": "GNU/Linux",
      "type": "EXEC",
      "x64": true
    },
    "platform": "GNU/Linux",
    "version": "0.6.3"
  },
  "visibility": "PUBLIC",
  "createdAt": "2019-09-25T14:01:23.159792",
  "verificationCount": 3,
  "signerCount": 1,
  "signer": "leonardo@vchain.us",
  "company": "vChain",
  "website": "https://codenotary.io",
  "verification": {
    "level": 3,
    "owner": "0x068e10d036175b874017320db5a9b852620679c4",
    "status": 0,
    "timestamp": "2019-09-25T14:01:20Z"
  }
}
```
