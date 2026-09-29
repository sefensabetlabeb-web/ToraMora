param(
  [Parameter(Mandatory = $true)]
  [string]$BackupFile
)

$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..\..')

$pgRestore = Get-Command pg_restore -ErrorAction SilentlyContinue
if (-not $pgRestore) {
  Write-Error "pg_restore was not found. Install PostgreSQL client tools and ensure pg_restore is in PATH."
  exit 1
}

if (-not (Test-Path $BackupFile -PathType Leaf)) {
  Write-Error "Backup file not found: $BackupFile"
  exit 1
}

& pg_restore --list "$BackupFile" | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Error "Backup verification failed: $BackupFile"
  exit $LASTEXITCODE
}

Write-Host "Backup verification passed: $BackupFile"
Write-Host "This confirms the dump catalogue is readable. Periodic restore tests to a disposable database are still recommended."
