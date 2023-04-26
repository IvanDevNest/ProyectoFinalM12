<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesPermissionsTable extends Migration
{
    public function up()
    {
        Schema::create('roles_permissions', function (Blueprint $table) {
            $table->unsignedBigInteger('id_role');
            $table->unsignedBigInteger('id_permission');
            $table->primary(['id_role', 'id_permission']);
            $table->timestamps();
            $table->foreign('id_role')->references('id')->on('roles')->onDelete('cascade');
            $table->foreign('id_permission')->references('id')->on('permissions')->onDelete('cascade');
            
        });
    }

    public function down()
    {
        Schema::dropIfExists('roles_permissions');
    }
}
