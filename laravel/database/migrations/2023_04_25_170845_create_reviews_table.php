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
            $table->unsignedBigInteger('id_reviewed');
            $table->unsignedBigInteger('id_author');
            $table->foreign('id_reviewed')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_author')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedTinyInteger('score')->unsigned()->check('score >= 1 and score <= 5');
            $table->timestamps();

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
