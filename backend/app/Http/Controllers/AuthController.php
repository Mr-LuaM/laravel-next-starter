<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // ✅ Validate request
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // ✅ Authenticate user
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // ✅ Generate Passport token
            $token = $user->createToken('MyApp')->accessToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => 'User login successful.'
            ], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        // ✅ Logout user by revoking token
        $request->user()->token()->revoke();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
