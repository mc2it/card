#!/usr/bin/env pwsh
Set-StrictMode -Version Latest

$file = "$PSScriptRoot/mc2it_card.js"
if (Test-Path "$file.map") { node --enable-source-maps $file @args }
else { node $file @args }
