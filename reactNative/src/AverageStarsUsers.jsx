import React from 'react'
import { View } from "react-native";
import StarRating from "react-native-star-rating";

const AverageStarsUsers = ({ rating }) => {
    console.log(rating)
  return (
    <View>
    <StarRating
      disabled={true}
      maxStars={5}
      rating={rating}
      starSize={20}
      fullStarColor={"gold"}
      emptyStarColor={"gray"}
    />
  </View>
  )
}

export default AverageStarsUsers