<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data['password'] = bcrypt($data['password']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/users');
            $data['image'] = $path;
        }

        return User::create($data);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:6',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        if ($request->hasFile('image')) {
            if ($user->image) {
                Storage::delete($user->image);
            }
            $path = $request->file('image')->store('public/users');
            $data['image'] = $path;
        }

        $user->update($data);

        return $user;
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->image) {
            Storage::delete($user->image);
        }

        $user->delete();

        return response()->noContent();
    }
}

