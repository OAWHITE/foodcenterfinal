<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Celebrity;
use App\Models\Recipe;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CelebrityController extends Controller
{
    public function index()
    {
        $celebrities = Celebrity::all()->map(function ($celebrity) {
            $celebrity->celebrityimage = url('images/' . $celebrity->celebrityimage);
            return $celebrity;
        });

        return response()->json($celebrities, 200);
    }

    public function store(Request $request)
    {
        Log::info('Request Data: ', $request->all());

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'celebrityimage' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            Log::error('Validation Errors: ', $validator->errors()->toArray());
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imageName = time() . '.' . $request->celebrityimage->extension();
        Log::info('Image Name: ' . $imageName);

        $request->celebrityimage->move(public_path('images'), $imageName);
        Log::info('Image Moved Successfully');

        $celebrity = Celebrity::create([
            'name' => $request->name,
            'description' => $request->description,
            'celebrityimage' => $imageName,
        ]);

        Log::info('Celebrity Created: ', $celebrity->toArray());

        return response()->json($celebrity, 201);
    }
    public function show($id)
    {
        $celebrity = Celebrity::with('recipes')->findOrFail($id);
        $celebrity->celebrityimage = $celebrity->image_url;
        $celebrity->recipes->each(function ($recipe) {
            $recipe->image = $recipe->image_url;
        });
        return response()->json($celebrity, 200);
    }

    public function update(Request $request, $id)
    {
        $celebrity = Celebrity::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'celebrityimage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('celebrityimage')) {
            if ($celebrity->celebrityimage) {
                Storage::delete($celebrity->celebrityimage);
            }
            $path = $request->file('celebrityimage')->store('public/celebrities');
            $data['celebrityimage'] = $path;
        }

        $celebrity->update($data);

        return response()->json($celebrity, 200);
    }

    public function getCelebrityFav(Request $request)
    {
        $recipesIds = $request->input('recipes');
        $celebrities = Celebrity::whereHas('recipes', function ($query) use ($recipesIds) {
            $query->whereIn('recipes.id', $recipesIds);
        })->get();

        return response()->json($celebrities);
    }

    public function destroy($id)
    {
        $celebrity = Celebrity::findOrFail($id);

        if ($celebrity->celebrityimage) {
            Storage::delete($celebrity->celebrityimage);
        }

        $celebrity->delete();

        return response()->json(null, 204);
    }
}
