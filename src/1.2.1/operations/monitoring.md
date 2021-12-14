# Health Monitoring

<WrappedSection>

immudb exposes a Prometheus end-point, by default on port 9497 on `/metrics`.<br/>
You can use `immuadmin stats` to see these metrics without additional tools:

<div class="wrapped-picture blend-screen">

![immuadmin stats](/immudb/immuadmin-stats.png)

</div>

immudb exports the standard Go metrics, so dashboards like [Go metrics](https://grafana.com/grafana/dashboards/10826) work out of the box.

<div class="wrapped-picture">

![immuadmin stats](/immudb/grafana-go.jpg)

</div>

For very simple cases, you can use `immuadmin status` from monitoring scripts to ping the server:

```
$ immuadmin status
OK - server is reachable and responding to queries
```

</WrappedSection>
