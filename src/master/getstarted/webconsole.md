
# Web Console

<WrappedSection>

immudb includes an embedded web console which can be accessed via the default port 8080 (`web-server-port` option).

![image](/webconsole.jpg)

The console allows you to:

* Metrics for the default database
* Execute SQL queries
* Configure users
* Create databases
* Manage permissions for users

</WrappedSection>

<WrappedSection>

### Accessing the Web Console

Once immudb has started, it will tell you if the web console is enabled and where it is listening:

```
immudb  2021/05/17 21:38:30 INFO: Webconsole enabled: 0.0.0.0:8080
immudb  2021/05/17 21:38:30 INFO: Web API server enabled on 0.0.0.0:8080/api (http)
```

Just navigating to that address in your web browser will bring you to the login screen:

![image](/browser.png)

</WrappedSection>



