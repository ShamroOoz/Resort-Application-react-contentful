import React from "react";
import { useData } from "../context";
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

export default function RoomContainer() {
  const { loading, sortedRooms } = useData();
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomsFilter />
      <RoomsList rooms={sortedRooms} />
    </>
  );
}
