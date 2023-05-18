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
            // 'id_role' => 1,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Ivan',
            'email' => 'ivasn@gmail.com',
            'lastname' => 'FR',
            'second_surname' => '300cv',
            // 'id_role' => 1,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Mary',
            'email' => 'mary@example.com',
            'lastname' => 'Smith',
            'second_surname' => 'Johnson',
            // 'id_role' => 2,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Tom',
            'email' => 'tom@example.com',
            'lastname' => 'Johnson',
            'second_surname' => 'Brown',
            // 'id_role' => 3,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'dsfs',
            'email' => 'fds@example.com',
            'lastname' => 'ds',
            'second_surname' => 'fds',
            // 'id_role' => 4,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'fs',
            'email' => 'ffdsfsfds@example.com',
            'lastname' => 'dhgfs',
            'second_surname' => 'fds',
            // 'id_role' => 4,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'hgfdjhdr',
            'email' => 'fdgdfgsdfs@example.com',
            'lastname' => 'ds',
            'second_surname' => 'fds',
            // 'id_role' => 4,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'fgdsgergr',
            'email' => 'gdsg@example.com',
            'lastname' => 'ds',
            'second_surname' => 'fds',
            // 'id_role' => 4,
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Ivan',
            'email' => 'ivan@gmail.com',
            'lastname' => 'FR',
            'second_surname' => '300cv',
            // 'id_role' => 1,
            'password' => Hash::make('1234'),
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ]);
    $admin = new User([
        'name'      => config('admin.name'),
        'email'     => config('admin.email'),
        'password'  => Hash::make(config('admin.password')),
    ]);
    $admin->save();
      
   }
}