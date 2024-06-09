<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Coach;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CoachController extends Controller
{
    public function index()
    {
        return response()->json(Coach::all(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'experience' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/coaches');
            $data['image'] = $path;
        }

        $coach = Coach::create($data);

        return response()->json($coach, 201);
    }

    public function show($id)
    {
        $coach = Coach::findOrFail($id);
        return response()->json($coach, 200);
    }

    public function update(Request $request, $id)
    {
        $coach = Coach::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'experience' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($coach->image) {
                Storage::delete($coach->image);
            }
            $path = $request->file('image')->store('public/coaches');
            $data['image'] = $path;
        }

        $coach->update($data);

        return response()->json($coach, 200);
    }

    public function destroy($id)
    {
        $coach = Coach::findOrFail($id);

        if ($coach->image) {
            Storage::delete($coach->image);
        }

        $coach->delete();

        return response()->json(null, 204);
    }
}

