<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ingredient;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class IngredientController extends Controller
{
    public function index()
    {
        $ingredients = Ingredient::all()->map(function ($ingredient) {
            if ($ingredient->image) {
                $ingredient->image = url(Storage::url($ingredient->image));
            }
            return $ingredient;
        });

        return response()->json($ingredients, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/ingredients');
            $data['image'] = $path;
            Log::info('Image uploaded to: ' . $path);
        } else {
            Log::info('No image uploaded.');
        }

        $ingredient = Ingredient::create($data);

        if ($ingredient->image) {
            $ingredient->image = url(Storage::url($ingredient->image));
        }

        return response()->json($ingredient, 201);
    }

    public function show($id)
    {
        $ingredient = Ingredient::findOrFail($id);
        if ($ingredient->image) {
            $ingredient->image = url(Storage::url($ingredient->image));
        }
        return response()->json($ingredient, 200);
    }

    public function update(Request $request, $id)
    {
        $ingredient = Ingredient::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($ingredient->image) {
                Storage::delete($ingredient->image);
            }
            $path = $request->file('image')->store('public/ingredients');
            $data['image'] = $path;
            Log::info('Image uploaded to: ' . $path);
        }

        $ingredient->update($data);

        if ($ingredient->image) {
            $ingredient->image = url(Storage::url($ingredient->image));
        }

        return response()->json($ingredient, 200);
    }

    public function destroy($id)
    {
        $ingredient = Ingredient::findOrFail($id);

        if ($ingredient->image) {
            Storage::delete($ingredient->image);
        }

        $ingredient->delete();

        return response()->json(null, 204);
    }
}
