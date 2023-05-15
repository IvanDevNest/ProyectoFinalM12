<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;



class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Crear rols
        $adminRole = Role::create(['name' => 'admin']);
        $vipRole = Role::create(['name' => 'vip']);
        $veteranoRole = Role::create(['name' => 'veterano']);
        $novatoRole = Role::create(['name' => 'novato']);


        //Crear permiso
        Permission::create(['name' => 'files.*']);
        Permission::create(['name' => 'files.list']);
        Permission::create(['name' => 'files.create']);
        Permission::create(['name' => 'files.update']);
        Permission::create(['name' => 'files.read']);
        Permission::create(['name' => 'files.delete']);

        Permission::create(['name' => 'routes.*']);
        Permission::create(['name' => 'routes.list']);
        Permission::create(['name' => 'routes.create']);
        Permission::create(['name' => 'routes.update']);
        Permission::create(['name' => 'routes.read']);
        Permission::create(['name' => 'routes.delete']);

        Permission::create(['name' => 'messages.*']);
        Permission::create(['name' => 'messages.list']);
        Permission::create(['name' => 'messages.create']);
        Permission::create(['name' => 'messages.update']);
        Permission::create(['name' => 'messages.read']);
        Permission::create(['name' => 'messages.delete']);
        
        //Assignar permisos
        $adminRole->givePermissionTo(['routes.*','files.*','messages.*']);
        $vipRole->givePermissionTo(['routes.list','routes.read','files.list','files.read','messages.list','messages.read']);
        $veteranoRole->givePermissionTo(['routes.list','routes.read','files.list','files.read','messages.list','messages.read']);
        $novatoRole->givePermissionTo(['routes.list','routes.read','files.list','files.read','messages.list','messages.read']);

        //Assignar rol “admin” a l’usuari/a administrador/a ja creat a BD
        $name  = config('admin.name');
        $admin = User::where('name', $name)->first();
        $admin->assignRole('admin');
    }
}