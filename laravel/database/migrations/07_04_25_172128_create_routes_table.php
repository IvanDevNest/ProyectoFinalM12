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
            $table->string('description')->nullable();
            $table->string('start_time');
            $table->string('estimated_duration');
            $table->string('type_vehicle');
            $table->integer('distance');

            // $table->string('cord_x');
            // $table->string('cord_y');
            $table->string('URL_maps');
            $table->integer('num_stops');
            $table->integer('max_users');
            
            // $table->unsignedBigInteger('id_author')->nullable();
            // $table->foreign('id_author')->references('id')->on('users');
            
            $table->unsignedBigInteger('id_route_style');
            $table->foreign('id_route_style')->references('id')->on('route_styles')->onDelete('cascade');
            $table->timestamps();
            $table->unsignedBigInteger('author_id');
            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('route_id')->nullable();
            $table->foreign('route_id')->references('id')->on('routes')->onDelete('cascade');
        });
    }

    public function down()
    {
        // Drop users route_id column 

        Schema::dropIfExists('routes');
    }
}
