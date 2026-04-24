# This script builds both WASM modules,
# moves them to destination directories,
# then deletes the build results.
# Comment out anything you might not need.

param (
    [string]$PiApproxRoot,
    [string]$JsOutDir,
    [string]$RawOutDir
)

$ErrorActionPreference = "Stop"

$BuildDir = Join-Path $PiApproxRoot "build_result"
$JsBuildDir = Join-Path $BuildDir "js"
$RawBuildDir = Join-Path $BuildDir "raw"

# Intermediate directory recreation
Write-Host "==> Creating intermediary build directory"
Remove-Item $BuildDir -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $JsBuildDir | Out-Null
New-Item -ItemType Directory -Path $RawBuildDir | Out-Null

# Build JS (wasm-pack) and move it
Write-Host "==> Building JS (wasm-pack)"
Push-Location $PiApproxRoot
wasm-pack build --target web --features js
Pop-Location
Write-Host "==> Copying JS build output"
Copy-Item -Path (Join-Path $PiApproxRoot "pkg\*") -Destination $JsBuildDir -Recurse

# Build raw WASM (cargo) and move it
Write-Host "==> Building raw WASM (cargo)"
Push-Location $PiApproxRoot
cargo build --target wasm32-unknown-unknown --release
Pop-Location
$RawWasmPath = Join-Path $PiApproxRoot "target\wasm32-unknown-unknown\release"
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
Remove-Item (Join-Path $PiApproxRoot "pkg") -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item (Join-Path $PiApproxRoot "target") -Recurse -Force -ErrorAction SilentlyContinue

# All is done :)
Write-Host "==> Build complete!"
