$ErrorActionPreference = 'Stop'
Write-Host '=== Hurghada Journeys environment check ===' -ForegroundColor Cyan
$node = node --version
$npm = npm --version
Write-Host "Node: $node"
Write-Host "npm : $npm"
$major = [int](($node -replace '^v','').Split('.')[0])
if ($major -lt 20) { throw 'Node.js 20.9+ is required.' }
Write-Host 'Environment OK.' -ForegroundColor Green
