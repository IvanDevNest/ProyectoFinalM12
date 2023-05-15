#!/bin/bash

php artisan db:seed --class=RolesSeeder
php artisan db:seed --class=FileSeeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=RouteStyleSeeder
php artisan db:seed --class=RoutesSeeder
php artisan db:seed --class=ReviewSeeder
php artisan db:seed --class=FollowersSeeder
php artisan db:seed --class=PermissionsSeeder
php artisan db:seed --class=RolePermissionsSeeder
php artisan db:seed --class=MessageSeeder
php artisan db:seed --class=MessageSeeder





