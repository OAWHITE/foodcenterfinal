<?php

namespace App\Http\Controllers;

use App\Models\RecipeIngredient;
use Illuminate\Http\Request;

class RecipeIngredientController extends Controller
{
    public function index()
    {
        return RecipeIngredient::all();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $recipeIngredient = RecipeIngredient::create($request->all());
        return response()->json($recipeIngredient, 201);
    }

    public function show($id)
    {
        return RecipeIngredient::find($id);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $recipeIngredient = RecipeIngredient::findOrFail($id);
        $recipeIngredient->update($request->all());
        return response()->json($recipeIngredient, 200);
    }

    public function destroy($id)
    {
        RecipeIngredient::destroy($id);
        return response()->json(null, 204);
    }
}
