# Script para iniciar Backend - Ecofort Market

Write-Host "[INICIANDO BACKEND - ECOFORT MARKET]" -ForegroundColor Cyan
Write-Host ""

$projectPath = Get-Location

# Verificar y activar ambiente virtual
if (!(Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "[ERROR] Ambiente virtual no encontrado. Ejecuta setup.ps1 primero." -ForegroundColor Red
    exit 1
}

& "$projectPath\venv\Scripts\Activate.ps1"

Write-Host "[OK] Ambiente virtual activado" -ForegroundColor Green

cd backend\ecofort_project

Write-Host "`n[*] Iniciando servidor Django en puerto 8000..." -ForegroundColor Yellow
Write-Host "[+] API disponible en: http://localhost:8000/api" -ForegroundColor Green
Write-Host "[+] Admin disponible en: http://localhost:8000/admin" -ForegroundColor Green
Write-Host "`n(Presiona CTRL+C para detener)" -ForegroundColor Gray
Write-Host ""

python manage.py runserver 0.0.0.0:8000
