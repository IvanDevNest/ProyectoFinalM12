<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoutesTable extends Migration
{
    public function up()
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('timetable');
            $table->string('cord_x');
            $table->string('cord_y');
            $table->string('URL_maps');
            $table->integer('num_stops');
            $table->integer('max_users');
            $table->foreignId('id_user')->constrained('users');
            $table->foreignId('id_route_style')->constrained('route_styles');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('routes');
    }
}
