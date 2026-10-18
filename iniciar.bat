@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Kova - Web en local

where npm >nul 2>nul || (echo [ERROR] No se encuentra Node.js. Instálalo desde https://nodejs.org & pause & exit /b 1)

rem --- Si ya está en marcha, solo se abre el navegador ---
netstat -ano | findstr /r /c:":4321 .*LISTENING" >nul
if %errorlevel% equ 0 (
    echo La web ya está en marcha. Abriendo el navegador...
    start "" http://localhost:4321
    timeout /t 3 >nul
    exit /b 0
)

rem --- Instala lo que falte. Si ya está todo, solo tarda unos segundos ---
if not exist node_modules echo Instalando dependencias por primera vez. Puede tardar unos minutos...
if exist node_modules echo Comprobando dependencias...
call npm install --prefer-offline --no-audit --no-fund --loglevel=error || (echo [ERROR] No se han podido instalar las dependencias. & pause & exit /b 1)

echo.
echo  ===============================================
echo    Kova · Web en local
echo  ===============================================
echo.
echo   Web:     http://localhost:4321
echo   Editor:  http://localhost:4321/admin
echo.
echo   El navegador se abrirá solo cuando la web esté lista.
echo   Para pararla, pulsa Ctrl + C en esta ventana.
echo.

rem --- Abre el navegador en cuanto la web responda (espera hasta 2 minutos) ---
start "" /min powershell -NoProfile -WindowStyle Hidden -Command "for($i=0;$i -lt 120;$i++){try{Invoke-WebRequest -Uri 'http://localhost:4321' -UseBasicParsing -TimeoutSec 2 | Out-Null; Start-Process 'http://localhost:4321'; break}catch{Start-Sleep -Seconds 1}}"

call npm run dev
