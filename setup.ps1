# Script de Inicio Rápido para Ecofort Market

Write-Host "[ECOFORT MARKET - INICIO RAPIDO]" -ForegroundColor Cyan
Write-Host ""

$projectPath = Get-Location

# Verificar si Python está instalado
Write-Host "[*] Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "[OK] Python encontrado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Python no está instalado o no está en PATH" -ForegroundColor Red
    exit 1
}

# Crear ambiente virtual si no existe
if (!(Test-Path "venv")) {
    Write-Host "`n[*] Creando ambiente virtual..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "[OK] Ambiente virtual creado" -ForegroundColor Green
}

# Activar ambiente virtual
Write-Host "`n[*] Activando ambiente virtual..." -ForegroundColor Yellow
& "$projectPath\venv\Scripts\Activate.ps1"
Write-Host "[OK] Ambiente virtual activado" -ForegroundColor Green

# Instalar dependencias backend
Write-Host "`n[*] Instalando dependencias del backend..." -ForegroundColor Yellow
cd backend
pip install -q -r requirements.txt 2>$null
Write-Host "[OK] Dependencias instaladas" -ForegroundColor Green

# Navegar a ecofort_project
cd ecofort_project

# Aplicar migraciones
Write-Host "`n[*] Aplicando migraciones de base de datos..." -ForegroundColor Yellow
python manage.py migrate --noinput 2>$null
Write-Host "[OK] Migraciones aplicadas" -ForegroundColor Green

# Crear superusuario si no existe
Write-Host "`n[*] Verificando superusuario..." -ForegroundColor Yellow
$userExists = python manage.py shell -c "from django.contrib.auth.models import User; print(User.objects.filter(username='admin').exists())" 2>$null
if ($userExists -eq "False") {
    Write-Host "Creando superusuario admin..." -ForegroundColor Cyan
    echo "admin" | python manage.py createsuperuser --username admin --email admin@ecofort.cl --noinput 2>$null
    python manage.py shell -c "from django.contrib.auth.models import User; u = User.objects.get(username='admin'); u.set_password('admin2025'); u.save()" 2>$null
    Write-Host "[OK] Superusuario creado (usuario: admin, contraseña: admin2025)" -ForegroundColor Green
}

Write-Host "`n[LISTO PARA INICIAR]" -ForegroundColor Green

Write-Host "`n[SIGUIENTES PASOS]" -ForegroundColor Cyan
Write-Host "  1. Abre DOS terminales PowerShell" -ForegroundColor White
Write-Host "  2. En TERMINAL 1 - Ejecuta:" -ForegroundColor White
Write-Host "     .\run_backend.ps1" -ForegroundColor Yellow
Write-Host "  3. En TERMINAL 2 - Ejecuta:" -ForegroundColor White
Write-Host "     .\run_frontend.ps1" -ForegroundColor Yellow
Write-Host "`n[ACCESO]" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:8080" -ForegroundColor Magenta
Write-Host "  API: http://localhost:8000/api" -ForegroundColor Magenta
Write-Host "  Admin: http://localhost:8000/admin (admin/admin2025)" -ForegroundColor Magenta
Write-Host ""
