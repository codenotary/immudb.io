# Health Monitoring

<WrappedSection>

immudb exposes a Prometheus end-point, by default on port 9497 on `/metrics`.<br/>

```bash
$ curl -s http://localhost:9497/metrics 
# HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0"} 1.3355e-05
go_gc_duration_seconds{quantile="0.25"} 1.3615e-05
go_gc_duration_seconds{quantile="0.5"} 1.9991e-05
go_gc_duration_seconds{quantile="0.75"} 3.0348e-05
go_gc_duration_seconds{quantile="1"} 3.3859e-05
go_gc_duration_seconds_sum 0.000151623
go_gc_duration_seconds_count 7
# HELP go_goroutines Number of goroutines that currently exist.
...
```

Querying metrics with a simple curl command is not a very practical solution. immudb has predefined Grafana dashboard visualizing some of the key metrics. This dashboard can be downloaded from [immudb github repository](https://github.com/codenotary/immudb/blob/master/tools/monitoring/grafana-dashboard.json).

<div class="wrapped-picture">

![immudb grafana stats](/immudb/grafana-immudb.png)

</div>

You can also use `immuadmin stats` to see these metrics without additional tools:

```bash
$ ./immuadmin stats
```

<div class="wrapped-picture blend-screen">

![immuadmin stats](/immudb/immuadmin-stats.png)

</div>

immudb exports the standard Go metrics, so dashboards like [Go metrics](https://grafana.com/grafana/dashboards/10826) work out of the box.

<div class="wrapped-picture">

![immuadmin stats](/immudb/grafana-go.jpg)

</div>

For very simple cases, you can use `immuadmin status` from monitoring scripts to ping the server:

```bash
$ ./immuadmin status
OK - server is reachable and responding to queries
```

</WrappedSection>
