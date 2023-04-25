<?php


namespace Tests\Feature;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;


class DbTest extends TestCase
{
   public function test_admin_v1()
   {
      $count = DB::table('users')
              ->where('name', '=', 'admin')
              ->count();
      $this->assertEquals($count, 1);
   }


   public function test_admin_v2()
   {
       $this->assertDatabaseHas('users', [
           'name' => 'admin',
       ]);
   }
}
