<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'create buku']);
        Permission::create(['name' => 'manage categories']);

        $role1 = Role::create(['name' => 'user']);
        $role1->givePermissionTo('create buku');

        $role2 = Role::create(['name' => 'admin']);
        $role2->givePermissionTo('create buku', 'manage categories');

        $user = \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password'=> 'detik123'
        ]);
        $user->assignRole($role2);
        $user->givePermissionTo('manage categories');
        $user = \App\Models\User::factory()->create([
            'name' => 'User1',
            'email' => 'user1@example.com',
            'password'=> 'detik123'
        ]);
        $user->assignRole($role1);
        $user = \App\Models\User::factory()->create([
            'name' => 'User2',
            'email' => 'user2@example.com',
            'password'=> 'detik123'
        ]);
        $user->assignRole($role1);
    }
}
