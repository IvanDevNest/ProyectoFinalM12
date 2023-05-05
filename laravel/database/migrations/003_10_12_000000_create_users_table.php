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
            $table->string('password');
            $table->string('lastname')->nullable();
            $table->unsignedBigInteger('file_id')->nullable();
            $table->foreign('file_id')->references('id')->on('files');
            $table->string('second_surname')->nullable();
            $table->string('remember_token')->nullable();
            $table->unsignedBigInteger('id_role')->default(1);
            $table->foreign('id_role')->references('id')->on('roles')->onDelete('cascade');
            $table->unsignedBigInteger('id_route')->nullable();
            $table->foreign('id_route')->references('id')->on('routes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
