$psWasmScriptPath = "$PSScriptRoot\powershell\wasm"

$rustPiApproxPath = "$PSScriptRoot\wasmpack\pi-approx"
$rustNestedLoopsPath = "$PSScriptRoot\wasmpack\nested-loops"
$rustSievePath = "$PSScriptRoot\wasmpack\sieve"
$rustBubbleSortPath = "$PSScriptRoot\wasmpack\bubble-sort"

$jsWasmPiApproxPath = "$PSScriptRoot\web\public\assets\js\piApprox\wasm"
$jsWasmNestedLoopsPath = "$PSScriptRoot\web\public\assets\js\nestedLoops\wasm"
$jsWasmSievePath = "$PSScriptRoot\web\public\assets\js\sieve\wasm"
$jsWasmBubbleSortPath = "$PSScriptRoot\web\public\assets\js\bubbleSort\wasm"

$rawWasmPath = "$PSScriptRoot\python\wasm_modules"

# Build and move pi-approx
Start-Process powershell `
    -WorkingDirectory $rustPiApproxPath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustPiApproxPath,
"-JsOutDir", $jsWasmPiApproxPath,
"-RawOutDir", $rawWasmPath,
"-Name", "pi-approx"

# Build and move nested-loops
Start-Process powershell `
    -WorkingDirectory $rustNestedLoopsPath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustNestedLoopsPath,
"-JsOutDir", $jsWasmNestedLoopsPath,
"-RawOutDir", $rawWasmPath,
"-Name", "nested-loops"

# Build and move sieve
Start-Process powershell `
    -WorkingDirectory $rustSievePath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustSievePath,
"-JsOutDir", $jsWasmSievePath,
"-RawOutDir", $rawWasmPath,
"-Name", "sieve"

# Build and move bubble-sort
Start-Process powershell `
    -WorkingDirectory $rustBubbleSortPath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustBubbleSortPath,
"-JsOutDir", $jsWasmBubbleSortPath,
"-RawOutDir", $rawWasmPath,
"-Name", "bubble-sort"
