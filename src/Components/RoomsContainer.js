import React from "react";
import { useData } from "../context";
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

export default function RoomContainer() {
  const { loading, setRoom, sortedRooms, rooms } = useData();
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} setRoom={setRoom} />
    </>
  );
}
