# Verify commit GitHub action
> A GitHub action to verify the authenticity of your commits with [CodeNotary.io](https://codenotary.io)

You can sign your work locally using the CodeNotary [vcn](https://github.com/vchain-us/vcn) tool (ie. `vcn notarize git://.`). This action will verify these signatures so other people will know that your commits come from a trusted source.

<img width="50%" src="https://raw.githubusercontent.com/vchain-us/verify-action/master/docs/commit-check.png" />


# Usage

Create a workflow `.yml` file in your repositories `.github/workflows` directory (eg. `.github/workflows/verify.yml`). In your workflow  you first need to checkout your repository then use this [action](https://github.com/vchain-us/verify-action):

```yaml
name: CodeNotary

on: [push]

jobs:
  check:

    runs-on: ubuntu-latest
    
    steps:
     - name: Checkout
       uses: actions/checkout@master
     
     - name: Verify
       uses: vchain-us/verify-action@master
```

For more details, see [Contexts and expression syntax for GitHub Actions](https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions)

## Inputs

See [action.yml](action.yml).

Available inputs

- `signerID` - List of SignerID(s) (separated by space) to authenticate against. A SignerID is the signer's public address (represented as a 40 hex characters long string prefixed with `0x`).
- `org` - Organization's ID to authenticate against. Note that `org` takes precedence over `signerID`
- `path` - Path to git working directory. Default to the current directory.

Example:
```yaml
     - name: Verify
       uses: vchain-us/verify-action@master
       with:
         signerID: <a trusted signer ID>
         org: <a trusted organization>
         path: <path to your repository, if not the current directory>
```

# License

[GPL-3.0](https://github.com/vchain-us/verify-action/blob/master/LICENSE)
