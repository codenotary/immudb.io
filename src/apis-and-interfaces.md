# APIs and interfaces

## Examples 
* [Golang code snippets](immudb/golang.md)
* [Curl code snippets](immugw/curl.md)

## SDK for immudb
SDKs for Java, Golang, .net, Python and Node are fully compatible with latest immudb release v0.8.0:

1. immudb4j [immudb4j](https://github.com/codenotary/immudb4j)
2. Golang [immudb-go](https://docs.immudb.io/immudb/golang.html)
3. .net [immudb4dotnet](https://github.com/codenotary/immudb4dotnet)
4. Python [immudb-py](https://github.com/codenotary/immudb-py)
5. Node.js [immudb-node](https://github.com/codenotary/immudb-node)


## immudb gRPC API reference

Here the gRPC documentation that shows available endpoints with protobuffer protocol  

[immudb gRPC](immudb/grpc-interface.md)

## immugw RESTful API reference
immugw can be found in a different [repository](https://github.com/codenotary/immugw)

You can find the swagger schema here:

[swagger immugw](https://github.com/codenotary/immugw/blob/master/pkg/api/gw.schema.swagger.json)

If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:

```bash
docker run -d -it -p 8081:8080 --name swagger-immugw -v ${PWD}/pkg/api/gw.schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```


