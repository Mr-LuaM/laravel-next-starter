<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Session\Middleware\StartSession; // ✅ Import Session Middleware
use Illuminate\Cookie\Middleware\EncryptCookies; // ✅ Ensure cookies are encrypted
use Illuminate\Session\Middleware\AuthenticateSession; // ✅ Authenticate session

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // ✅ Allow API authentication via Sanctum
        $middleware->append([
            EnsureFrontendRequestsAreStateful::class,
            EncryptCookies::class, // ✅ Encrypt session cookies
            StartSession::class, // ✅ Start session handling
            AuthenticateSession::class, // ✅ Authenticate session users
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Handle application exceptions
    })
    ->create();
