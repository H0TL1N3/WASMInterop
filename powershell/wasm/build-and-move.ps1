# This script builds both WASM modules,
# moves them to destination directories,
# then deletes the build results.
# Comment out anything you might not need.

param (
    [Parameter(Mandatory = $true)]
    [string]$SourceRoot,

    [Parameter(Mandatory = $true)]
    [string]$JsOutDir,

    [Parameter(Mandatory = $true)]
    [string]$RawOutDir,

    [Parameter(Mandatory = $false)]
    [string]$Name = "unknown"
)

$ErrorActionPreference = "Stop"

$BuildDir = Join-Path $SourceRoot "build_result"
$JsBuildDir = Join-Path $BuildDir "js"
$RawBuildDir = Join-Path $BuildDir "raw"

# Write name to identify powershell window
Write-Host "==> Building WebAssembly module with the name: $Name"

# Intermediate directory recreation
Write-Host "==> Creating intermediary build directory"
Remove-Item $BuildDir -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $JsBuildDir | Out-Null
New-Item -ItemType Directory -Path $RawBuildDir | Out-Null

# Build JS (wasm-pack) and move it
Write-Host "==> Building JS (wasm-pack)"
Push-Location $SourceRoot
wasm-pack build --target web --features js
Pop-Location
Write-Host "==> Copying JS build output"
Copy-Item -Path (Join-Path $SourceRoot "pkg\*") -Destination $JsBuildDir -Recurse

# Build raw WASM (cargo) and move it
Write-Host "==> Building raw WASM (cargo)"
Push-Location $SourceRoot
cargo build --target wasm32-unknown-unknown --release
Pop-Location
$RawWasmPath = Join-Path $SourceRoot "target\wasm32-unknown-unknown\release"
$WasmFile = Get-ChildItem -Path $RawWasmPath -Filter "*.wasm" | Select-Object -First 1
if (-not $WasmFile) {
    throw "Raw WASM file not found!"
}
Write-Host "==> Copying raw WASM"
Copy-Item -Path $WasmFile.FullName -Destination $RawBuildDir

# Copy to client and server destinations
Write-Host "==> Copying client WASM to $JsOutDir"
New-Item -ItemType Directory -Path $JsOutDir -Force | Out-Null
Copy-Item -Path "$JsBuildDir\*" -Destination $JsOutDir -Recurse -Force

Write-Host "==> Copying server WASM to $RawOutDir"
New-Item -ItemType Directory -Path $RawOutDir -Force | Out-Null
Copy-Item -Path "$RawBuildDir\*" -Destination $RawOutDir -Recurse -Force

# Cleanup build results
Write-Host "==> Cleaning up intermediate build folders"
Remove-Item (Join-Path $SourceRoot "pkg") -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item (Join-Path $SourceRoot "target") -Recurse -Force -ErrorAction SilentlyContinue

# All is done :)
Write-Host "==> Build complete!"
