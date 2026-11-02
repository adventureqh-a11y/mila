$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) { & $node.Source "$PSScriptRoot/server.mjs"; exit }
$code = Join-Path $env:LOCALAPPDATA 'Programs/Microsoft VS Code/Code.exe'
if (Test-Path -LiteralPath $code) {
  $env:ELECTRON_RUN_AS_NODE = '1'
  Start-Process -FilePath $code -ArgumentList ('"' + $PSScriptRoot + '/server.mjs"') -WindowStyle Hidden -Wait
} else { Write-Error 'Install Node.js LTS and run npm start.' }
