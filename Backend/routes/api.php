<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CelebrityController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeIngredientController;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/recipes', [RecipeController::class, 'store']);
    Route::post('/celebrities', [CelebrityController::class, 'store']);
    
    // Other protected routes
    Route::put('/recipes/{id}', [RecipeController::class, 'update']);
});
// Route::post('/recipes/verify', [RecipeController::class, 'verify']);
// Route::put('/recipes/{id}', [RecipeController::class, 'update']);
Route::get('/recipe-ingredients', [RecipeIngredientController::class, 'index']);
Route::post('/recipe-ingredients', [RecipeIngredientController::class, 'store']);

Route::get('/celebrities', [CelebrityController::class, 'index']);
Route::get('/celebrities/{id}', [CelebrityController::class, 'show']);
Route::put('/celebrities/{id}', [CelebrityController::class, 'update']);
Route::delete('/celebrities/{id}', [CelebrityController::class, 'destroy']);

// Coach routes
Route::get('/coaches', [CoachController::class, 'index']);
Route::post('/coaches', [CoachController::class, 'store']);
Route::get('/coaches/{id}', [CoachController::class, 'show']);
Route::put('/coaches/{id}', [CoachController::class, 'update']);
Route::delete('/coaches/{id}', [CoachController::class, 'destroy']);

// Ingredient routes
Route::get('/ingredients', [IngredientController::class, 'index']);
Route::post('/ingredients', [IngredientController::class, 'store']);
Route::get('/ingredients/{id}', [IngredientController::class, 'show']);
Route::put('/ingredients/{id}', [IngredientController::class, 'update']);
Route::delete('/ingredients/{id}', [IngredientController::class, 'destroy']);

// Recipe routes
Route::get('/recipes/{id}/ingredients', [RecipeController::class, 'getIngredients']);
Route::post('/recipes/by-ingredients', [RecipeController::class, 'getRecipesByIngredients']);

Route::get('/recipes', [RecipeController::class, 'index']);
// Route::post('/recipes', [RecipeController::class, 'store']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);
// Route::put('/recipes/{id}', [RecipeController::class, 'update']);
Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']);

// User routes
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
// Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
