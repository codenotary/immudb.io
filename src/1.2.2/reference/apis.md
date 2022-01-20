# APIs reference

## immudb gRPC API reference

Here the gRPC documentation that shows available endpoints with protobuffer protocol

## immugw RESTful API reference

immugw can be found in a different [repository](https://github.com/codenotary/immugw)

You can find the swagger schema here:

[swagger immugw](https://github.com/codenotary/immugw/blob/master/pkg/api/gw.schema.swagger.json)

If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:

```bash
docker run -d -it -p 8081:8080 --name swagger-immugw -v ${PWD}/pkg/api/gw.schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```

## Examples

* [Curl code snippets](../old/immugw/curl.md)
* [Immudb SDKs examples](https://github.com/codenotary/immudb-client-examples)
