# APIs and interfaces

## Golang immudb
[Golang code snippets](immudb/golang.md)

## Curl examples immugw
[Curl code snippets](immugw/index.md)


## immudb RESTful API reference

You can find the swagger schema here:

[swagger immudb](https://github.com/codenotary/immudb/blob/master/pkg/api/schema/schema.swagger.json)

If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:

```bash
docker run -d -it -p 8080:8080 --name swagger-immudb -v ${PWD}/pkg/api/schema/schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```

## immudb gRPC API reference

coming soon

## immugw RESTful API reference

You can find the swagger schema here:

[swagger immudb](https://github.com/codenotary/immudb/blob/master/pkg/api/schema/gw.schema.swagger.json)

If you want to run the Swagger UI, simply run the following Docker command after you cloned this repo:

```bash
docker run -d -it -p 8081:8080 --name swagger-immugw -v ${PWD}/pkg/api/schema/gw.schema.swagger.json:/openapi.json -e SWAGGER_JSON=/openapi.json  swaggerapi/swagger-ui
```


