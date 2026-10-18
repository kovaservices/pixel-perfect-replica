@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
cd /d "%~dp0"
title Kova - Actualizar la web
set "RAMA=web-astro"

echo.
echo  ===============================================
echo    Kova · Actualizar la web con los cambios de GitHub
echo  ===============================================
echo.

where git >nul 2>nul || (echo [ERROR] No se encuentra Git. Instálalo desde https://git-scm.com & goto :fin)
where npm >nul 2>nul || (echo [ERROR] No se encuentra Node.js. Instálalo desde https://nodejs.org & goto :fin)

rem --- Asegurarse de estar en la rama de la web ---
for /f "delims=" %%b in ('git rev-parse --abbrev-ref HEAD') do set "ACTUAL=%%b"
if /i not "!ACTUAL!"=="%RAMA%" (
    echo Estabas en la rama !ACTUAL!. Cambiando a %RAMA%...
    git checkout %RAMA% || goto :fallo
)

echo Comprobando si hay cambios nuevos en GitHub...
git fetch origin %RAMA% || goto :fallo
for /f "delims=" %%h in ('git rev-parse HEAD') do set "ANTES=%%h"

rem --- ¿Hay cambios en este ordenador que no están guardados en Git? ---
set "LOCALES="
for /f "delims=" %%l in ('git status --porcelain') do set "LOCALES=1"

rem --- ¿Hay cambios guardados aquí que no llegaron a subirse (por ejemplo, de una vez anterior que falló)? ---
set "PENDIENTES=0"
for /f "delims=" %%n in ('git rev-list --count origin/%RAMA%..HEAD') do set "PENDIENTES=%%n"

if not defined LOCALES (
    if "!PENDIENTES!"=="0" (
        git pull --ff-only origin %RAMA% || goto :fallo
        goto :dependencias
    )
    echo Hay cambios guardados en este ordenador que aún no están en GitHub. Subiéndolos...
    git pull --rebase origin %RAMA% || goto :conflicto
    git push origin %RAMA% || goto :fallo
    echo Cambios subidos a GitHub.
    goto :dependencias
)

rem Si los archivos ya son iguales que en GitHub (por ejemplo, copiados a mano), solo se alinea Git.
git diff --quiet --ignore-cr-at-eol origin/%RAMA% --
if !errorlevel! equ 0 (
    echo Tus archivos ya coinciden con GitHub. Poniendo Git al día...
    git reset --hard origin/%RAMA% >nul || goto :fallo
    goto :dependencias
)

echo.
echo Tienes cambios en este ordenador que todavía no están en GitHub:
echo.
git status --short
echo.
echo Para actualizar, primero hay que guardarlos y subirlos a GitHub.
choice /c SN /m "¿Guardar y subir estos cambios ahora"
if errorlevel 2 (
    echo.
    echo No se ha cambiado nada.
    goto :fin
)
set "MENSAJE="
set /p "MENSAJE=Describe brevemente los cambios (o pulsa Enter): "
if not defined MENSAJE set "MENSAJE=Cambios desde el ordenador"
rem --- Git necesita un nombre y un email para guardar cambios (se pregunta una sola vez) ---
set "GITEMAIL="
for /f "delims=" %%e in ('git config user.email 2^>nul') do set "GITEMAIL=%%e"
if not defined GITEMAIL (
    echo.
    echo Git necesita saber quién hace los cambios. Solo se pregunta esta vez.
    set /p "GITNOMBRE=Tu nombre: "
    set /p "GITEMAIL=Tu email, el de la cuenta de GitHub: "
    git config user.name "!GITNOMBRE!"
    git config user.email "!GITEMAIL!"
)
git add -A || goto :fallo
git commit -m "!MENSAJE!" || goto :fallo
git pull --rebase origin %RAMA% || goto :conflicto
git push origin %RAMA% || goto :fallo
echo Cambios subidos a GitHub.

:dependencias
for /f "delims=" %%h in ('git rev-parse HEAD') do set "DESPUES=%%h"
echo.
if "!ANTES!"=="!DESPUES!" (
    echo Ya tenías la última versión.
) else (
    echo Novedades descargadas:
    git log --oneline !ANTES!..!DESPUES!
)

set "INSTALAR="
if not exist node_modules set "INSTALAR=1"
if not "!ANTES!"=="!DESPUES!" (
    git diff --name-only !ANTES! !DESPUES! | findstr /i "package.json package-lock.json" >nul && set "INSTALAR=1"
)
if defined INSTALAR (
    echo.
    echo Instalando dependencias nuevas...
    call npm install --no-audit --no-fund || goto :fallo
)

echo.
echo  Listo. Si la web estaba abierta, ciérrala (Ctrl + C en su ventana)
echo  y vuelve a abrirla con iniciar.bat para ver los cambios.
goto :fin

:conflicto
echo.
git rebase --abort >nul 2>nul
echo [AVISO] Tus cambios tocan las mismas líneas que otros cambios que ya están en GitHub,
echo y Git no sabe con cuál quedarse. No se ha perdido nada: todo sigue como estaba.
echo Pide ayuda antes de seguir. Para evitarlo, ejecuta actualizar.bat ANTES de
echo ponerte a editar con Tina y otra vez nada más terminar.
goto :fin

:fallo
echo.
echo [ERROR] Algo ha fallado. Revisa el mensaje de arriba.

:fin
echo.
pause
