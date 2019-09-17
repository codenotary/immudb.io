# Formatted output (json/yaml)

`vcn` can output results in `json` or `yaml` formats by using the [--output global flag](../cmd/vcn.md#options).
> Although all commands support `--output`, some could return an empty results (ie. `vcn login`, `vcn logout`, and `vcn dashboard`).

## Examples

```
vcn authenticate docker://nginx --output yaml
```

```
vcn list --output json
```

```
vcn notarize file.txt
```
> You need to set `VCN_NOTARIZATION_PASSWORD` [environment variable](environments.md#other-environment-variables) to make `vcn` work in non-interactive mode

## Dealing with errors

When an error is encountered, `vcn` will print the usual error message to the *Standard error* but also will return an error object (formatted accordingly to `--output`) to the *Standard output*.

### Example of mixed *Standard error* and *Standard output*
```
$ vcn authenticate non-existing.txt --output json
Error: open non-existing.txt: no such file or directory
{
  "error": "open non-existing.txt: no such file or directory"
}
```

### Example of redirecting the *Standard output* to get the formatted result
```
$ vcn authenticate non-existing.txt --output json > output.json
Error: open non-existing.txt: no such file or directory

$ cat output.json
{
  "error": "open non-existing.txt: no such file or directory"
}
```