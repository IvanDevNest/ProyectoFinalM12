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
            $table->string('gender')->nullable();
            $table->unsignedBigInteger('file_id')->nullable();
            $table->foreign('file_id')->references('id')->on('files');
            $table->string('second_surname')->nullable();
            $table->string('remember_token')->nullable();

            // $table->unsignedBigInteger('id_role')->default(1);
            // $table->foreign('id_role')->references('id')->on('roles')->onDelete('cascade');

            $table->timestamps();
        });
        Schema::table('files', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}