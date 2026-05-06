$psWasmScriptPath = "$PSScriptRoot\powershell\wasm"

$rustPiApproxPath = "$PSScriptRoot\wasmpack\pi-approx"
$rustNestedLoopsPath = "$PSScriptRoot\wasmpack\nested-loops"
$rustSievePath = "$PSScriptRoot\wasmpack\sieve"

$jsWasmPiApproxPath = "$PSScriptRoot\web\public\assets\js\piApprox\wasm"
$jsWasmNestedLoopsPath = "$PSScriptRoot\web\public\assets\js\nestedLoops\wasm"
$jsWasmSievePath = "$PSScriptRoot\web\public\assets\js\sieve\wasm"

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

# Build and move sieve
Start-Process powershell `
    -WorkingDirectory $rustSievePath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustSievePath,
"-JsOutDir", $jsWasmSievePath,
"-RawOutDir", $rawWasmPath
