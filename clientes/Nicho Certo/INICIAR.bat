@echo off
cd /d "%~dp0"
echo.
echo  Iniciando Nicho Certo...
echo.

start "NC · Painel LP"   /min node painel.js
start "NC · CRM"         /min node crm.js
start "NC · Criativos"   /min node criativos.js

timeout /t 2 /nobreak >nul

start "NC · Shell"       node shell.js
