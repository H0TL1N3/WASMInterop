$psWasmScriptPath = "$PSScriptRoot\powershell\wasm"

$rustPiApproxPath = "$PSScriptRoot\wasmpack\pi-approx"
$rustNestedLoopsPath = "$PSScriptRoot\wasmpack\nested-loops"
$rustFibonacciPath = "$PSScriptRoot\wasmpack\fibonacci"
$rustSievePath = "$PSScriptRoot\wasmpack\sieve"
$rustBubbleSortPath = "$PSScriptRoot\wasmpack\bubble-sort"
$rustQuickSortPath = "$PSScriptRoot\wasmpack\quick-sort"
$rustStringTransformationPath = "$PSScriptRoot\wasmpack\string-transformation"
$rustDijkstraPath = "$PSScriptRoot\wasmpack\dijkstra"

$jsWasmPiApproxPath = "$PSScriptRoot\web\public\assets\js\piApprox\wasm"
$jsWasmNestedLoopsPath = "$PSScriptRoot\web\public\assets\js\nestedLoops\wasm"
$jsWasmFibonacciPath = "$PSScriptRoot\web\public\assets\js\fibonacci\wasm"
$jsWasmSievePath = "$PSScriptRoot\web\public\assets\js\sieve\wasm"
$jsWasmBubbleSortPath = "$PSScriptRoot\web\public\assets\js\bubbleSort\wasm"
$jsWasmQuickSortPath = "$PSScriptRoot\web\public\assets\js\quickSort\wasm"
$jsWasmStringTransformationPath = "$PSScriptRoot\web\public\assets\js\stringTransformation\wasm"
$jsWasmDijkstraPath = "$PSScriptRoot\web\public\assets\js\dijkstra\wasm"

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

# Build and move fibonacci
Start-Process powershell `
    -WorkingDirectory $rustFibonacciPath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustFibonacciPath,
"-JsOutDir", $jsWasmFibonacciPath,
"-RawOutDir", $rawWasmPath,
"-Name", "fibonacci"

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

# Build and move quick-sort
Start-Process powershell `
    -WorkingDirectory $rustQuickSortPath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustQuickSortPath,
"-JsOutDir", $jsWasmQuickSortPath,
"-RawOutDir", $rawWasmPath,
"-Name", "quick-sort"

# Build and move string-transformation
Start-Process powershell `
    -WorkingDirectory $rustStringTransformationPath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustStringTransformationPath,
"-JsOutDir", $jsWasmStringTransformationPath,
"-RawOutDir", $rawWasmPath,
"-Name", "string-transformation"

# Build and move dijkstra
Start-Process powershell `
    -WorkingDirectory $rustDijkstraPath `
    -ArgumentList "-File", "$psWasmScriptPath\build-and-move.ps1",
"-SourceRoot", $rustDijkstraPath,
"-JsOutDir", $jsWasmDijkstraPath,
"-RawOutDir", $rawWasmPath,
"-Name", "dijkstra",
"-UseRawFeature"
