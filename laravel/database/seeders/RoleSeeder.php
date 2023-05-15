<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['id' => Role::ADMIN, 'name' => 'admin']);
        Role::create(['id' => Role::VIP, 'name' => 'vip']);
        Role::create(['id' => Role::VETERANO,  'name' => 'veterano']);
        Role::create(['id' => Role::NOVATO,  'name' => 'novato']);
    }
}
