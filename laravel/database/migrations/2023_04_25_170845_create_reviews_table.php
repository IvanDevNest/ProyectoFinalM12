<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_reviewed')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_author')->constrained('users')->onDelete('cascade');
            $table->unsignedTinyInteger('score');
            $table->timestamps();
            $table->unique(['id_reviewed', 'id_author']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};
