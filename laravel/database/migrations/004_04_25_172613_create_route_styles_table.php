<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteStylesTable extends Migration
{
    public function up()
    {
        Schema::create('route_styles', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['slow', 'normal', 'fast']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('route_styles');
    }
}