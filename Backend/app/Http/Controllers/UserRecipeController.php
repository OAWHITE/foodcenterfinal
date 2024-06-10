<?php

namespace App\Http\Controllers;

use App\Models\UserRecipe;
use Illuminate\Http\Request;

class UserRecipeController extends Controller
{
    public function index()
    {
        return UserRecipe::all();
    }
    public function getUserFavorites()
    {
        $user = Auth::user();
        $favoriteRecipes = Recipe::whereIn('id', UserRecipe::where('user_id', $user->id)->pluck('recipe_id'))->get();

        return response()->json($favoriteRecipes);
    }
    public function create()
    {
        //
    }
    public function favoriteRecipe(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        $user = Auth::user();
        $userRecipe = UserRecipe::create([
            'user_id' => $user->id,
            'recipe_id' => $request->recipe_id,
        ]);

        return response()->json($userRecipe, 201);
    }

    public function store(Request $request)
    {
        $userRecipe = UserRecipe::create($request->all());
        return response()->json($userRecipe, 201);
    }

    public function show($id)
    {
        return UserRecipe::find($id);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $userRecipe = UserRecipe::findOrFail($id);
        $userRecipe->update($request->all());
        return response()->json($userRecipe, 200);
    }

    public function destroy($id)
    {
        UserRecipe::destroy($id);
        return response()->json(null, 204);
    }
}

