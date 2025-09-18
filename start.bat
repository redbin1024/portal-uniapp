@echo off
chcp 65001 >nul
title 微信小程序运行模式选择

:menu
cls
echo.
echo ========================================
echo    微信小程序 - 运行模式选择
echo ========================================
echo.
echo 请选择运行环境:
echo.
echo [1] 开发环境 (dev)
echo     - API: https://dev-api.xiaodingdang1.com/
echo     - 调试: 开启
echo.
echo [2] 测试环境 (test)
echo     - API: https://test-api.xiaodingdang1.com/
echo     - 调试: 开启
echo.
echo [3] 预发布环境 (staging)
echo     - API: https://staging-api.xiaodingdang1.com/
echo     - 调试: 关闭
echo.
echo [4] 生产环境 (pro)
echo     - API: https://admin-api.xiaodingdang1.com/
echo     - 调试: 关闭
echo.
echo [5] 构建模式选择
echo [6] 环境信息查看
echo [0] 退出
echo.
echo ========================================

set /p choice=请输入选项 (0-6): 

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto test
if "%choice%"=="3" goto staging
if "%choice%"=="4" goto pro
if "%choice%"=="5" goto build_menu
if "%choice%"=="6" goto env_info
if "%choice%"=="0" goto exit
goto invalid

:dev
echo.
echo 🚀 启动开发环境...
call npm run dev:mp-weixin
pause
goto menu

:test
echo.
echo 🧪 启动测试环境...
call npm run dev:mp-weixin:test
pause
goto menu

:staging
echo.
echo 🎯 启动预发布环境...
call npm run dev:mp-weixin:staging
pause
goto menu

:pro
echo.
echo 🌟 启动生产环境...
call npm run dev:mp-weixin:pro
pause
goto menu

:build_menu
cls
echo.
echo ========================================
echo    构建模式选择
echo ========================================
echo.
echo [1] 构建开发版本
echo [2] 构建测试版本
echo [3] 构建预发布版本
echo [4] 构建生产版本
echo [0] 返回主菜单
echo.
echo ========================================

set /p build_choice=请输入选项 (0-4): 

if "%build_choice%"=="1" (
    echo.
    echo 🔨 构建开发版本...
    call npm run build:mp-weixin:dev
    pause
    goto build_menu
)
if "%build_choice%"=="2" (
    echo.
    echo 🔨 构建测试版本...
    call npm run build:mp-weixin:test
    pause
    goto build_menu
)
if "%build_choice%"=="3" (
    echo.
    echo 🔨 构建预发布版本...
    call npm run build:mp-weixin:staging
    pause
    goto build_menu
)
if "%build_choice%"=="4" (
    echo.
    echo 🔨 构建生产版本...
    call npm run build:mp-weixin:pro
    pause
    goto build_menu
)
if "%build_choice%"=="0" goto menu
goto build_menu

:env_info
cls
echo.
echo ========================================
echo    环境配置信息
echo ========================================
echo.
call npm run env
echo.
pause
goto menu

:invalid
echo.
echo ❌ 无效选项，请重新选择！
timeout /t 2 >nul
goto menu

:exit
echo.
echo 👋 感谢使用！
timeout /t 1 >nul
exit