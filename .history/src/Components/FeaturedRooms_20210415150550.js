import React from "react";
import Title from "./Title";
import { useData } from "../context";
import Room from "./Room";
import Loading from "./Loading";

const FeaturedRooms = () => {
  let data = useData();
  let { loading, featuredRooms: rooms } = useData();

  rooms = rooms.map((room) => {
    return <Room key={room.id} room={room} />;
  });

  return (
    <div>
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    </div>
  );
};

export default FeaturedRooms;
