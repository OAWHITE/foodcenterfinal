<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth; // Add this line


class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::all()->map(function ($recipe) {
            if ($recipe->image) {
                $recipe->image = url(Storage::url($recipe->image));
            }
            return $recipe;
        });

        return response()->json($recipes, 200);
    }

    public function show($id)
    {
        $recipe = Recipe::findOrFail($id);
        if ($recipe->image) {
            $recipe->image = url(Storage::url($recipe->image));
        }
        return response()->json($recipe, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'instructions' => 'required|string',
            'calories' => 'nullable|integer',
            'region' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'fat' => 'nullable|integer',
            'carbs' => 'nullable|integer',
            'protein' => 'nullable|integer',
        ]);

        try {
            $recipe = new Recipe();
            $recipe->title = $request->title;
            $recipe->description = $request->description;
            $recipe->instructions = $request->instructions;
            $recipe->calories = $request->calories;
            $recipe->region = $request->region;

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
                $recipe->image = $imagePath;
            }

            $recipe->fat = $request->fat;
            $recipe->carbs = $request->carbs;
            $recipe->protein = $request->protein;
            $recipe->user_id = Auth::id();

            $recipe->save();

            return response()->json(['message' => 'Recipe added successfully'], 201);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
    

    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($recipe->image) {
                Storage::delete($recipe->image);
            }
            $path = $request->file('image')->store('public/recipes');
            $data['image'] = $path;
        }

        $recipe->update($data);

        return response()->json($recipe, 200);
    }

    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);

        if ($recipe->image) {
            Storage::delete($recipe->image);
        }

        $recipe->delete();

        return response()->json(null, 204);
    }
}
