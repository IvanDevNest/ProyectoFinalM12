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
        Schema::create('followers', function (Blueprint $table) {
            $table->unsignedBigInteger('id_follower');
            $table->unsignedBigInteger('id_followed');
            $table->foreign('id_follower')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_followed')->references('id')->on('users')->onDelete('cascade');
            $table->primary(['id_follower', 'id_followed']);
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
        Schema::dropIfExists('followers');
    }
};
