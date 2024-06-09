<?php

namespace App\Http\Controllers;

use App\Models\Chef;
use Illuminate\Http\Request;

class ChefController extends Controller
{
    public function index()
    {
        return Chef::all();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $chef = Chef::create($request->all());
        return response()->json($chef, 201);
    }

    public function show($id)
    {
        return Chef::find($id);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $chef = Chef::findOrFail($id);
        $chef->update($request->all());
        return response()->json($chef, 200);
    }

    public function destroy($id)
    {
        Chef::destroy($id);
        return response()->json(null, 204);
    }
}
