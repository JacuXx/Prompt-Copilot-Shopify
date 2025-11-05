# 🔐 Script de Configuración de Token para Windows
# Este script te ayuda a configurar el token de GitHub para repositorios privados

Write-Host "`n🔐 Configuración de Token de GitHub" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Verificar si ya existe un token
if ($env:GITHUB_TOKEN) {
    Write-Host "✓ Ya tienes un token configurado: " -ForegroundColor Green -NoNewline
    Write-Host "$($env:GITHUB_TOKEN.Substring(0, 10))..." -ForegroundColor Yellow
    
    $respuesta = Read-Host "`n¿Quieres reemplazarlo? (s/n)"
    if ($respuesta -ne 's' -and $respuesta -ne 'S') {
        Write-Host "`nOK, manteniendo el token actual." -ForegroundColor Blue
        exit 0
    }
}

Write-Host "`n📋 Pasos para obtener tu token:" -ForegroundColor Yellow
Write-Host "1. Ve a: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "2. Click en 'Generate new token' → 'Generate new token (classic)'" -ForegroundColor White
Write-Host "3. Dale un nombre: 'Shopify Copilot Sync'" -ForegroundColor White
Write-Host "4. Selecciona el scope: 'repo' (Full control)" -ForegroundColor White
Write-Host "5. Click en 'Generate token' y cópialo`n" -ForegroundColor White

$abrir = Read-Host "¿Quieres abrir GitHub ahora para crear el token? (s/n)"
if ($abrir -eq 's' -or $abrir -eq 'S') {
    Start-Process "https://github.com/settings/tokens/new?description=Shopify%20Copilot%20Sync&scopes=repo"
    Write-Host "`n✓ Navegador abierto. Crea tu token y vuelve aquí." -ForegroundColor Green
}

Write-Host "`n🔑 Ingresa tu token de GitHub:" -ForegroundColor Cyan
$token = Read-Host "(empieza con ghp_)"

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host "`n❌ No ingresaste ningún token. Abortando." -ForegroundColor Red
    exit 1
}

if (-not $token.StartsWith("ghp_") -and -not $token.StartsWith("github_pat_")) {
    Write-Host "`n⚠️  Advertencia: El token no parece válido (debería empezar con ghp_ o github_pat_)" -ForegroundColor Yellow
    $continuar = Read-Host "¿Continuar de todas formas? (s/n)"
    if ($continuar -ne 's' -and $continuar -ne 'S') {
        Write-Host "`nAbortando." -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n📌 ¿Cómo quieres guardar el token?" -ForegroundColor Cyan
Write-Host "1. Solo para esta sesión de PowerShell (temporal)" -ForegroundColor White
Write-Host "2. Permanente (recomendado - variable de entorno de usuario)`n" -ForegroundColor White

$opcion = Read-Host "Elige una opción (1 o 2)"

if ($opcion -eq '2') {
    try {
        [System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', $token, 'User')
        $env:GITHUB_TOKEN = $token
        Write-Host "`n✅ Token configurado permanentemente!" -ForegroundColor Green
        Write-Host "   El token estará disponible en todas las nuevas sesiones de PowerShell." -ForegroundColor Blue
        Write-Host "`n💡 Tip: Cierra y vuelve a abrir PowerShell para que el token esté disponible automáticamente." -ForegroundColor Yellow
    } catch {
        Write-Host "`n❌ Error al guardar permanentemente: $_" -ForegroundColor Red
        Write-Host "   Configurando solo para esta sesión..." -ForegroundColor Yellow
        $env:GITHUB_TOKEN = $token
    }
} else {
    $env:GITHUB_TOKEN = $token
    Write-Host "`n✅ Token configurado para esta sesión!" -ForegroundColor Green
    Write-Host "   El token solo estará disponible en esta ventana de PowerShell." -ForegroundColor Blue
}

Write-Host "`n🧪 Verificando configuración..." -ForegroundColor Cyan
if ($env:GITHUB_TOKEN) {
    Write-Host "✓ Token configurado correctamente: " -ForegroundColor Green -NoNewline
    Write-Host "$($env:GITHUB_TOKEN.Substring(0, 10))...$($env:GITHUB_TOKEN.Substring($env:GITHUB_TOKEN.Length - 4))" -ForegroundColor Yellow
} else {
    Write-Host "❌ Error: No se pudo configurar el token" -ForegroundColor Red
    exit 1
}

Write-Host "`n🚀 ¡Listo! Ahora puedes ejecutar:" -ForegroundColor Green
Write-Host "   npx github:JacuXx/Prompt-Copilot-Shopify`n" -ForegroundColor Cyan

$probar = Read-Host "¿Quieres probarlo ahora? (s/n)"
if ($probar -eq 's' -or $probar -eq 'S') {
    Write-Host "`n🔄 Ejecutando comando...`n" -ForegroundColor Cyan
    npx github:JacuXx/Prompt-Copilot-Shopify --help
}

Write-Host "`n═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Configuración completa!`n" -ForegroundColor Green
