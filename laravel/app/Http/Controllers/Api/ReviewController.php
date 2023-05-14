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
            'stars' => 'required|integer|between:1,5',
            'reviewed_id' => 'required',
            'author_review_id' => 'required',
        ]);

        // Verificar si el usuario está tratando de evaluarse a sí mismo
        if ($validatedData['reviewed_id'] == $validatedData['author_review_id']) {
            return response()->json(['error' => 'No puedes evaluarte a ti mismo'], 400);
        }

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
            'stars' => 'required|integer|between:1,5',
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
