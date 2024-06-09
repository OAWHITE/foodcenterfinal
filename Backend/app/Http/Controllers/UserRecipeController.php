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

    public function create()
    {
        //
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

