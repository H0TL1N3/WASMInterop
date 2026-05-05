$psWasmScriptPath = "$PSScriptRoot\powershell\wasm"

$rustPiApproxPath = "$PSScriptRoot\wasmpack\pi-approx"
$rustNestedLoopsPath = "$PSScriptRoot\wasmpack\nested-loops"

$jsWasmPiApproxPath = "$PSScriptRoot\web\public\assets\js\piApprox\wasm"
$jsWasmNestedLoopsPath = "$PSScriptRoot\web\public\assets\js\nestedLoops\wasm"

$rawWasmPath = "$PSScriptRoot\python\wasm_modules"

# Build and move pi-approx
Start-Process powershell `
    -WorkingDirectory $rustPiApproxPath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustPiApproxPath,
"-JsOutDir", $jsWasmPiApproxPath,
"-RawOutDir", $rawWasmPath

# Build and move nested-loops
Start-Process powershell `
    -WorkingDirectory $rustNestedLoopsPath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustNestedLoopsPath,
"-JsOutDir", $jsWasmNestedLoopsPath,
"-RawOutDir", $rawWasmPath
