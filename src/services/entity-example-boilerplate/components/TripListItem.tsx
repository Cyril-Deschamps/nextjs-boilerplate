import React from "react";
import { Trip } from "../trip";

const TripListItem = ({ trip }: { trip: Trip }): JSX.Element => {
  return <div>{trip.destinationName}</div>;
};

export default TripListItem;
