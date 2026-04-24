$psWasmScriptPath = "$PSScriptRoot\powershell\wasm"

$rustPiApproxPath = "$PSScriptRoot\wasmpack\pi-approx"

$jsWasmPiApproxPath = "$PSScriptRoot\web\public\assets\js\piApprox\wasm"

$rawWasmApproxPath = "$PSScriptRoot\python\wasm_modules"

# Build and move pi approx
Start-Process powershell `
    -WorkingDirectory $rustPiApproxPath `
    -ArgumentList "-File", "$psWasmScriptPath\pi-approx.ps1",
"-PiApproxRoot", $rustPiApproxPath,
"-JsOutDir", $jsWasmPiApproxPath,
"-RawOutDir", $rawWasmApproxPath
