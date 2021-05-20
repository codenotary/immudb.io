# Health Monitoring

immudb exposes a Prometheus end-point, by default on port 9497 on `/metrics`.

The web console will present some of these metrics: database size, number of entries and memory usage:

![Web console metrics](/immudb/webconsole-metrics.png)

You can use `immuadmin stats` to see these metrics without additional tools:

![immuadmin stats](/immudb/immuadmin-stats.png)

immudb exports the standard Go metrics, so dashboards like [Go metrics](https://grafana.com/grafana/dashboards/10826) work out of the box.

![immuadmin stats](/immudb/grafana-go.png)

For very simple cases, you can use `immuadmin status` from monitoring scripts to ping the server:

```
$ immuadmin status
OK - server is reachable and responding to queries
```
