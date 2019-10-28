# vcn-powershell
PowerShell Scripts for CodeNotary vcn

## vcn-folder-watch.ps
That Powershell script watches a defined directory on your system and notarizes files that are stored here using your [CodeNotary.io account ](https://dashboard.codenotary.io/auth/signup)

Make sure to download the vcn binary as well: [CodeNotary vcn cli](https://github.com/vchain-us/vcn/releases/latest)

You only need to change the variables in the beginning of the script according to your environment:
- $vcnpath
- $watcher.Path
- $watcher.IncludeSubdirectories

### run the script fully automated
If you want to fully automated, please set the following environment variables:
- VCN_USER
- VCN_PASSWORD
- VCN_NOTARIZATION_PASSWORD

You can learn more about that here: [CodeNotary vcn environment](https://docs.codenotary.io/vcn/user-guide/environments.html)

## vcn-folder-workflow.ps1
extension of vcn-folder-watch.ps to support a simple trust workflow, when files are created or moved into the specific folder. Only the last notarization action counts.

- All newly created files in C:\CodeNotary\Production will be trusted
- All newly created files in C:\CodeNotary\Old will be untrusted
- All newly created files in C:\CodeNotary\Unwanted will be unsupported

## function-Get-CNAuthenticate.ps1
Get-Function to authenticate an existing file with CodeNotary.io and return the result as json

Load the function in your PowerShell session
`. .\function-Get-CNAuthenticate.ps1`

Authenticate file
`get-item .\codenotary-watcher.ps1 | Get-CNAuthenticate`

Check verification status
`Get-CNAuthenticate -Path .\codenotary-watcher.ps1 | select -ExpandProperty verification`

