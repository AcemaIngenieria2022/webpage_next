@echo off
cd /d "%~dp0"

:: 1. Compilar (puedes comentar esta línea con '::' si ya compilaste antes)
call npm run build

:: 2. Arrancar Next.js
call npm run start -- -p 3000