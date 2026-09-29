param(
  [string]$OutputDirectory = ".\backups"
)

$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..\..')

# Load the same environment-file priority used by the app/Prisma when values
# are not already supplied by the hosting environment.
foreach ($file in @('.env.production.local', '.env.local', '.env.production', '.env')) {
  if (Test-Path $file) {
    Get-Content $file | ForEach-Object {
      $line = $_.Trim()
      if (-not $line -or $line.StartsWith('#') -or -not $line.Contains('=')) { return }
      $parts = $line.Split('=', 2)
      $name = $parts[0].Trim()
      $value = $parts[1].Trim().Trim('"').Trim("'")
      if ($name -and -not (Test-Path "Env:$name")) { Set-Item -Path "Env:$name" -Value $value }
    }
  }
}

if (-not $env:DATABASE_URL) {
  Write-Error "DATABASE_URL is not configured in the environment or supported .env files."
  exit 1
}

$pgDump = Get-Command pg_dump -ErrorAction SilentlyContinue
if (-not $pgDump) {
  Write-Error "pg_dump was not found. Install PostgreSQL client tools and ensure pg_dump is in PATH."
  exit 1
}

New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$file = Join-Path $OutputDirectory "hurghada_journeys_$stamp.dump"

& pg_dump --format=custom --no-owner --no-acl --dbname="$env:DATABASE_URL" --file="$file"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Backup created: $file"
