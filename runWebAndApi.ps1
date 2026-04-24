$psScriptPath = "$PSScriptRoot\powershell" 
$webPath = "$PSScriptRoot\web"
$apiPath = "$PSScriptRoot\python"

Start-Process powershell `
    -WorkingDirectory $webPath `
    -ArgumentList "-NoExit", "-File", "$psScriptPath\start-web.ps1"

Start-Process powershell `
    -WorkingDirectory $apiPath `
    -ArgumentList "-NoExit", "-File", "$psScriptPath\start-api.ps1"
