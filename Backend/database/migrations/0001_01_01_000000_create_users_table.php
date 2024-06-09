<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->string('role')->nullable();
        $table->string('profile_image')->nullable();
        $table->string('allergies')->nullable();
        $table->decimal('height', 5, 2)->nullable();
        $table->decimal('weight', 5, 2)->nullable();
        $table->rememberToken();
        $table->timestamps();
    });
}

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
