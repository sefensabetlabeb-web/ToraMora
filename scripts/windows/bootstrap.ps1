$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot\..\..
& "$PSScriptRoot\check-environment.ps1"
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
npm install
npm run lint
npm run typecheck
npm run build
Write-Host 'Bootstrap and quality checks completed.' -ForegroundColor Green
