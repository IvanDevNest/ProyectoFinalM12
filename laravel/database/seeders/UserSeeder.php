<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;



class UserSeeder extends Seeder
{
   public function run()
   {
    DB::table('users')->insert([
        [
            'name' => 'John',
            'email' => 'john@example.com',
            'lastname' => 'Doe',
            'second_surname' => 'Smith',
            'id_role' => 1,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Mary',
            'email' => 'mary@example.com',
            'lastname' => 'Smith',
            'second_surname' => 'Johnson',
            'id_role' => 2,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Tom',
            'email' => 'tom@example.com',
            'lastname' => 'Johnson',
            'second_surname' => 'Brown',
            'id_role' => 3,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ]);
       $admin = new User([
           'name'      => 'joel',
           'email'     => 'jododi@fp.insjoaquimmir.cat',
           'file_id'   => '1',
           'password'  => Hash::make('12345678'),
           'created_at' => now(),
           'updated_at' => now(),
       ]);
       $admin->save();
   }
}