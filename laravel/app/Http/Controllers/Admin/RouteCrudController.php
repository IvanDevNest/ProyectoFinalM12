<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\RouteRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class RouteCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class RouteCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Route::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/route');
        CRUD::setEntityNameStrings('route', 'routes');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('name');
        CRUD::column('description');
        CRUD::column('date');
        CRUD::column('estimated_duration');
        CRUD::column('type_vehicle');
        CRUD::column('distance');
        CRUD::column('num_stops');
        CRUD::column('max_users');
        CRUD::column('startLatitude');
        CRUD::column('startLongitude');
        CRUD::column('endLatitude');
        CRUD::column('endLongitude');
        CRUD::column('author_id');
        CRUD::column('id_route_style');

        /**
         * Columns can be defined using the fluent syntax or array syntax:
         * - CRUD::column('price')->type('number');
         * - CRUD::addColumn(['name' => 'price', 'type' => 'number']); 
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(RouteRequest::class);

        CRUD::field('name');
        CRUD::field('description');
        CRUD::field('date');
        CRUD::field('estimated_duration');
        CRUD::field('type_vehicle');
        CRUD::field('distance');
        CRUD::field('num_stops');
        CRUD::field('max_users');
        CRUD::field('startLatitude');
        CRUD::field('startLongitude');
        CRUD::field('endLatitude');
        CRUD::field('endLongitude');
        CRUD::field('author_id');
        CRUD::field('id_route_style');

        /**
         * Fields can be defined using the fluent syntax or array syntax:
         * - CRUD::field('price')->type('number');
         * - CRUD::addField(['name' => 'price', 'type' => 'number'])); 
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
