# APIs and interfaces

## Examples 
* [Golang code snippets](immudb/golang.md)
* [Curl code snippets](immugw/curl.md)

## SDK for immudb
* [Java SDK for immudb repository](https://github.com/codenotary/immudb4j)


## immudb RESTful API reference

You can find the swagger schema here:

[swagger immudb](https://github.com/codenotary/immudb/blob/master/pkg/api/schema/schema.swagger.json)

If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:

```bash
docker run -d -it -p 8080:8080 --name swagger-immudb -v ${PWD}/pkg/api/schema/schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```

## immudb gRPC API reference

Here the gRPC documentation that show available endpoints with protobuffer protocol  

[immudb gRPC](immudb/grpc-interface.md)

## immugw RESTful API reference
immugw can be found in a different [repository](https://github.com/codenotary/immugw)

You can find the swagger schema here:

[swagger immugw](https://github.com/codenotary/immugw/blob/master/pkg/api/schema/gw.schema.swagger.json)

If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:

```bash
docker run -d -it -p 8081:8080 --name swagger-immugw -v ${PWD}/pkg/api/schema/gw.schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```


