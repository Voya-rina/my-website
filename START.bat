@echo off
cd /d "%~dp0"

set "PORT=8000"
set "MAXPORT=8010"

:findport
set "PID="
for /f "tokens=5" %%a in ('netstat -ano ^| findstr /c:":%PORT% " ^| findstr /i "LISTENING"') do set "PID=%%a"
if not defined PID goto startserver

choice /c KNC /n /m "Port %PORT% is in use (PID %PID%). [K]ill it, [N]ext port, [C]ancel: "
if errorlevel 3 exit /b
if errorlevel 2 goto nextport
taskkill /f /pid %PID% >nul 2>&1
timeout /t 1 /nobreak >nul 2>&1
goto startserver

:nextport
set /a PORT+=1
if %PORT% LEQ %MAXPORT% goto findport
choice /c C /n /m "No free port in 8000-%MAXPORT%. Press C to exit: "
exit /b

:startserver
start "" /min python -m http.server %PORT% >nul 2>&1
set /a TRIES=0

:verify
netstat -ano | findstr /c:":%PORT% " | findstr /i "LISTENING" >nul 2>&1
if not errorlevel 1 goto openbrowser
set /a TRIES+=1
if %TRIES% GEQ 10 goto servererror
timeout /t 1 /nobreak >nul 2>&1
goto verify

:openbrowser
start "" http://localhost:%PORT%/src/index.html
exit /b

:servererror
choice /c C /n /m "Server failed to start on port %PORT%. Press C to exit: "
exit /b
