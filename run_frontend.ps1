# Script para iniciar Frontend - Ecofort Market

Write-Host "[INICIANDO FRONTEND - ECOFORT MARKET]" -ForegroundColor Cyan
Write-Host ""

cd frontend

Write-Host "[*] Iniciando servidor web en puerto 8080..." -ForegroundColor Yellow
Write-Host "[+] Frontend disponible en: http://localhost:8080" -ForegroundColor Green
Write-Host "`n(Presiona CTRL+C para detener)" -ForegroundColor Gray
Write-Host ""

python -m http.server 8080
