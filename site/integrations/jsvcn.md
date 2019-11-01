# jsvcn

#### CodeNotary - JavaScript Client 

> Global, de-centralized signing of code and other digital assets.

This package provides an easy to use javascript client for the [CodeNotary](https://www.codenotary.io)
platform. 

## Features: 

- authenticate digital assets via Codenotary API or Codenotary Blockchain
- notarize, untrust and unsupport digital assets via Codenotary API 

## Demo

- [Demo App - Vue.js](https://vchain-us.github.io/jsvcn/) ([source](https://github.com/vchain-us/jsvcn/tree/master/example))
- [CodeNotary Authenticate App](https://authenticate.codenotary.io/)
- [CodeNotary Chrome Extension](https://chrome.google.com/webstore/detail/vchain-codenotary-downloa/mnloemedehacppeggbipipjlphdjpjcb)

## Install: 

``` 
npm install jsvcn

```

## Init

ES6: 

```javascript

import Jsvcn from "jsvcn"

const jsvcn = new Jsvcn();

```

ES5 (bundled): 

```html
<script src="https://unpkg.com/jsvcn@2.0.1/dist/jsvcn.min.js" type="text/javascript"></script>

```

```javascript

var jsvcn = new Jsvcn();

```


### Configuration

Configure the client via passing a configuration object to the constructor: 

```javascript

const config = {
	credentials: {
		email: 'test@vchain.us',
		password: 'abc123',
	},
	mode: 'blockchain',
	...
}

const jsvcn = new Jsvcn(config);

```

#### List of configuration options

| Configuration |  Descrition |
| --- | --- |
| credentials  | Credentials for notarization | 
| mode | Default value: 'api' - Switch between 'api and 'blockchain' mode |
| checksums | Default value: ['sha256'] You can add more hash algorithms to get the hashed file's checksums.  | 
| validationOnly | Default: false. Blockchain mode only. Set it to true in case you don't want to query asset details from the CodeNotary Asset Server (faster response) |
| apiUrl | Custom CodeNotary API url - overwrite this if you use local vcn api |
| blockchainUrl | CodeNotary Blockchain url - overwrite this if you want to use staging |
| assetUrl |  CodeNotary Asset Server url - overwrite this if you want to use staging  |
| blockchainAssetAddress |  Custom Contract address - for staging | 
| blockchainOrganizationAddress |  Custom Org. Contract address - for staging | 

Every configuration option is optional.


## Authentication

```javascript
jsvcn.verify(file).then((response) => {
 ...
})
```

More information about the response format: [#] (CodeNotary API Documentation])


## Notarization

```javascript
jsvcn.sign(file).then((response) => {
 ...
})
```

For notarization you need to pass valid CodeNotary user credentials in the config: 

```javascript

const jsvcn = new Jsvcn({
	credentials: {
		email: 'test@vchain.us',
		password: 'abc123',
		// notarizationPassword: 'abc321' - required only when your notarization password is different than your normal user password. 
	},
	...
);
```

More information about the response format: [#] (CodeNotary API Documentation])

## Untrust / Unsupport 

In case you want to unsupport/untrust an asset of yours that you no longer have, you can do that exactly the same way like signing one: 

```javascript

jsvcn.untrust(<file or hash>).then((response) => { ...

```

## FAQ:


### Authenticate / notarize sha256 hashes 

Verify and sign are able to authenticate / notarize directly the SHA256 hash of an asset: 

``` javascript

jsvcn.verify("32c6a50aba0b30f63f124f4b2bb47dc027b9e48f838f71d1debe69d8680ecf70");

``` 

### Async - await syntax

Verify and sign methods are always returning with a Promise. 
If you prefer async-await syntax you can use that as well: 

``` javascript

async function myAuthenticate(){
 const {status} = await jsvcn.verify(FILE);
 ...
}

```

### Progress callback (for large files)

Since veriy and sign methods are asyncronous calls it's easy to implement progress indicators (eg. just toggle a variable before and after the call.) But for verify and sign commands we are also providing a progress callback as second parameter which periodically returns with the exact percentage of the file hashing progress. This is really handy when you verify large files and want to display (the real) status of the progress.

``` javascript
jsvcn.sign(file, (progress) => console.log(progress + '%'));

``` 

### Calculate Checksums

CodeNotary.io uses SHA256 algorithm to calculate and compare file hashes, but our library can also provide SHA1, SHA512, MD5 checksums of the file. You can add "checksums" attribute to the config object with an array of checksums you want to get back from the verify method.

``` javascript
const jsvcn = new Jsvcn({checksums: ["sha1", "md5"]});

``` 


### Authentication directly via the CodeNotary Blockchain with Ethers.js

If you want to directly authenticate assets with CodeNotary Blockchain add this to your html page:

```
<script src="https://cdn.ethers.io/scripts/ethers-v4.min.js" type="text/javascript"></script>

```
and set ``` mode: 'blockchain',``` in your config. 


## License

This software is released under GPL3.
