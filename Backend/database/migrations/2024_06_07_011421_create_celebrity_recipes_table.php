<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCelebrityRecipesTable extends Migration
{
    public function up()
    {
        Schema::create('celebrity_recipes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('celebrity_id');
            $table->unsignedBigInteger('recipe_id');
            $table->foreign('celebrity_id')->references('id')->on('celebrities')->onDelete('cascade');
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('celebrity_recipes');
    }
}

