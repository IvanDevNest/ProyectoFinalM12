<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reviews = Review::all();

        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'score' => 'required|integer|between:1,5',
            'id_reviewed' => 'required',
            'id_author' => 'required',
        ]);

        $review = Review::create($validatedData);

        return response()->json([
            'success' => true,
            'data' => $review,
            'message' => 'Review created successfully.'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        return response()->json([
            'success' => true,
            'data' => $review
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        $validatedData = $request->validate([
            'score' => 'required|integer|between:1,5',
            'id_reviewed' => 'required|unique:reviews,id_reviewed,'.$review->id,
            'id_author' => 'required|unique:reviews,id_author,'.$review->id,
        ]);

        $review->update($validatedData);

        return response()->json([
            'success' => true,
            'data' => $review,
            'message' => 'Review updated successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully.'
        ]);
    }
}
